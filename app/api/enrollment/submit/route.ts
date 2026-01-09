import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { enrollmentData, enrollmentId } = body;

    // Send confirmation email to student
    const emailResponse = await resend.emails.send({
      from: "The House of Tutu <info@houseoftutuacademy.com>",
      to: [enrollmentData.email],
      bcc: ["info@houseoftutuacademy.com"],
      subject: `Enrollment Confirmation - ${enrollmentData.receiptNumber}`,
      html: generateEnrollmentEmailHTML(enrollmentData),
      text: generateEnrollmentEmailText(enrollmentData),
    });

    return NextResponse.json({
      success: true,
      emailId: emailResponse.data?.id,
      enrollmentId,
      message: "Email sent successfully",
    });
  } catch (error: any) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

function generateEnrollmentEmailHTML(data: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        /* Same email styles as before */
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
              <p><strong>Registration Fee:</strong> ₦${data.registrationFee.toLocaleString()}</p>
              <p><strong>Course Fee:</strong> ₦${data.courseFee.toLocaleString()}</p>
              <p><strong>Total Paid:</strong> ₦${data.totalAmount.toLocaleString()}</p>
              <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
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
            <p>Email: info@houseoftutuacademy.com</p>
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

function generateEnrollmentEmailText(data: any): string {
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
    - Registration Fee: ₦${data.registrationFee.toLocaleString()}
    - Course Fee: ₦${data.courseFee.toLocaleString()}
    - Total Paid: ₦${data.totalAmount.toLocaleString()}
    - Payment Method: ${data.paymentMethod}
    
    WHAT HAPPENS NEXT?
    1. Payment verification within 24 hours
    2. Course access credentials via email
    3. WhatsApp group invitation
    4. Orientation session details
    
    NEED ASSISTANCE?
    WhatsApp: +234 911 264 4027
    Email: info@houseoftutuacademy.com
    Hours: Monday - Friday, 9AM - 5PM
    
    The House of Tutu Perfumery Academy
    Abuja, Nigeria
    © ${new Date().getFullYear()} All rights reserved.
  `;
}
