// app/api/enrollment/process/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { database } from "@/app/lib/firebase";
import { ref, set } from "firebase/database";

// Initialize Resend with fallback
const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  console.warn("RESEND_API_KEY is not set in environment variables");
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: NextRequest) {
  try {
    const enrollmentData = await request.json();
    console.log("Received enrollment data:", enrollmentData);

    // Validate required fields
    const requiredFields = ["fullName", "email", "phoneNumber", "program"];
    const missingFields = requiredFields.filter(
      (field) => !enrollmentData[field]
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Generate IDs
    const enrollmentId = `ENR-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const receiptNumber = `TUTU-${Date.now()
      .toString()
      .slice(-8)}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    // Prepare complete data
    const completeData = {
      ...enrollmentData,
      enrollmentId,
      receiptNumber,
      submissionDate: new Date().toISOString(),
      status: "pending",
      emailSent: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    // Check if Firebase is configured
    if (!database) {
      console.error("Firebase database is not initialized");
      return NextResponse.json(
        {
          success: false,
          message: "Database not configured",
        },
        { status: 500 }
      );
    }

    // Save to Firebase with error handling
    try {
      const enrollmentRef = ref(database, `enrollments/${enrollmentId}`);
      await set(enrollmentRef, completeData);
      console.log("Successfully saved to Firebase:", enrollmentId);
    } catch (firebaseError: any) {
      console.error("Firebase save error:", firebaseError);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to save enrollment data",
          error: firebaseError.message,
        },
        { status: 500 }
      );
    }

    // Send emails (optional, don't fail if email fails)
    let studentEmailSuccess = false;
    let adminEmailSuccess = false;
    let studentEmailId = null;
    let adminEmailId = null;

    if (resend) {
      try {
        // Send student confirmation
        const studentEmail = await sendStudentConfirmation(completeData);
        studentEmailSuccess = studentEmail.success;
        studentEmailId = studentEmail.emailId;

        // Send admin notification
        const adminEmail = await sendAdminNotification(completeData);
        adminEmailSuccess = adminEmail.success;
        adminEmailId = adminEmail.emailId;

        // Update email status in Firebase if emails were sent
        if (studentEmailSuccess) {
          const enrollmentRef = ref(database, `enrollments/${enrollmentId}`);
          await set(enrollmentRef, {
            ...completeData,
            emailSent: true,
            studentEmailId,
            adminEmailId,
            updatedAt: Date.now(),
          });
        }
      } catch (emailError) {
        console.error("Email sending error:", emailError);
        // Don't fail the enrollment if email fails
      }
    } else {
      console.warn("Resend not configured, skipping email sending");
    }

    return NextResponse.json({
      success: true,
      enrollmentId,
      receiptNumber,
      emailSent: studentEmailSuccess,
      adminNotified: adminEmailSuccess,
      message: "Enrollment processed successfully",
    });
  } catch (error: any) {
    console.error("Enrollment processing error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process enrollment",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

// ... rest of your email functions remain the same

function generateStudentEmailHTML(data: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #691C33; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .section { margin-bottom: 25px; border-bottom: 2px solid #eee; padding-bottom: 15px; }
        .highlight { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #ffc107; }
        .info-box { background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd; margin: 10px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .badge { background: #691C33; color: white; padding: 5px 10px; border-radius: 20px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎓 Enrollment Confirmation</h1>
          <p>The House of Tutu Perfumery Academy</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h2>Thank You, ${data.fullName}!</h2>
            <p>Your enrollment for the <strong>${
              data.program
            }</strong> has been received successfully.</p>
            <div class="badge">${data.receiptNumber}</div>
          </div>
          
          <div class="section">
            <h3>📝 Enrollment Details</h3>
            <div class="info-box">
              <p><strong>Program:</strong> ${data.program}</p>
              <p><strong>Delivery Format:</strong> ${
                data.deliveryFormat === "in-class"
                  ? "In-Class (Physical)"
                  : "Live Online"
              }</p>
              <p><strong>Enrollment Date:</strong> ${new Date(
                data.submissionDate
              ).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div class="section">
            <h3>💰 Payment Summary</h3>
            <div class="info-box">
              <p><strong>Registration Fee:</strong> ₦${
                data.registrationFee?.toLocaleString() || "0"
              }</p>
              <p><strong>Course Fee:</strong> ₦${
                data.courseFee?.toLocaleString() || "0"
              }</p>
              <p><strong>Total Paid:</strong> ₦${
                data.totalAmount?.toLocaleString() || "0"
              }</p>
              <p><strong>Payment Method:</strong> ${
                data.paymentMethod || "Not specified"
              }</p>
            </div>
          </div>
          
          <div class="highlight">
            <h4>🔔 What Happens Next?</h4>
            <ol>
              <li>Payment verification within 24 hours</li>
              <li>Course access credentials via email</li>
              <li>WhatsApp group invitation</li>
              <li>Orientation session details</li>
            </ol>
          </div>
          
          <div class="section">
            <h3>📞 Need Assistance?</h3>
            <p>WhatsApp: +234 911 264 4027</p>
            <p>Email: enrollment@houseoftutu.com</p>
            <p>Hours: Monday - Friday, 9AM - 5PM</p>
          </div>
        </div>
        
        <div class="footer">
          <p>The House of Tutu Perfumery Academy</p>
          <p>Abuja, Nigeria</p>
          <p>© ${new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateStudentEmailText(data: any): string {
  return `
    ENROLLMENT CONFIRMATION - The House of Tutu Perfumery Academy
    
    Thank you, ${data.fullName}!
    
    Your enrollment for ${data.program} has been received successfully.
    Receipt Number: ${data.receiptNumber}
    
    ENROLLMENT DETAILS:
    - Program: ${data.program}
    - Delivery Format: ${
      data.deliveryFormat === "in-class" ? "In-Class (Physical)" : "Live Online"
    }
    - Enrollment Date: ${new Date(data.submissionDate).toLocaleDateString()}
    
    PAYMENT SUMMARY:
    - Registration Fee: ₦${data.registrationFee?.toLocaleString() || "0"}
    - Course Fee: ₦${data.courseFee?.toLocaleString() || "0"}
    - Total Paid: ₦${data.totalAmount?.toLocaleString() || "0"}
    - Payment Method: ${data.paymentMethod || "Not specified"}
    
    WHAT HAPPENS NEXT?
    1. Payment verification within 24 hours
    2. Course access credentials via email
    3. WhatsApp group invitation
    4. Orientation session details
    
    NEED ASSISTANCE?
    WhatsApp: +234 911 264 4027
    Email: enrollment@houseoftutu.com
    Hours: Monday - Friday, 9AM - 5PM
    
    The House of Tutu Perfumery Academy
    Abuja, Nigeria
    © ${new Date().getFullYear()} All rights reserved.
  `;
}

function generateAdminEmailHTML(data: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .info-box { background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd; margin: 10px 0; }
        .action-buttons { margin-top: 20px; }
        .button { display: inline-block; padding: 10px 20px; background: #691C33; color: white; text-decoration: none; border-radius: 5px; margin-right: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚨 New Enrollment Received</h1>
          <p>Requires Verification</p>
        </div>
        
        <div class="content">
          <div class="info-box">
            <h3>Enrollment Details</h3>
            <p><strong>Enrollment ID:</strong> ${data.enrollmentId}</p>
            <p><strong>Receipt:</strong> ${data.receiptNumber}</p>
            <p><strong>Name:</strong> ${data.fullName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phoneNumber}</p>
            <p><strong>Program:</strong> ${data.program}</p>
            <p><strong>Format:</strong> ${data.deliveryFormat}</p>
            <p><strong>Amount:</strong> ₦${
              data.totalAmount?.toLocaleString() || "0"
            }</p>
            <p><strong>Date:</strong> ${new Date(
              data.submissionDate
            ).toLocaleString()}</p>
          </div>
          
          <div class="info-box">
            <h3>Payment Information</h3>
            <p><strong>Method:</strong> ${data.paymentMethod}</p>
            <p><strong>Registration Fee:</strong> ₦${
              data.registrationFee?.toLocaleString() || "0"
            }</p>
            <p><strong>Course Fee:</strong> ₦${
              data.courseFee?.toLocaleString() || "0"
            }</p>
            <p><strong>Total Paid:</strong> ₦${
              data.totalAmount?.toLocaleString() || "0"
            }</p>
          </div>
          
          <div class="info-box">
            <h3>Additional Information</h3>
            <p><strong>City:</strong> ${data.city || "Not provided"}</p>
            <p><strong>Country:</strong> ${data.country || "Not provided"}</p>
            <p><strong>Business:</strong> ${
              data.hasBusiness === "yes" ? "Yes" : "No"
            }</p>
            ${
              data.hasBusiness === "yes" && data.businessName
                ? `<p><strong>Business Name:</strong> ${data.businessName}</p>`
                : ""
            }
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e7f3ff; border-radius: 5px; border-left: 4px solid #0066cc;">
            <h4 style="margin-top: 0; color: #0066cc;">Student Expectations:</h4>
            <p style="font-style: italic;">"${
              data.expectations || "No expectations provided"
            }"</p>
          </div>
          
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            This is an automated notification. Please verify payment and update enrollment status.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}
