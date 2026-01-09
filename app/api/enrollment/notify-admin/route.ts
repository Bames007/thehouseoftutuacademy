import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { enrollmentData, enrollmentId } = body;

    await sendAdminNotification(enrollmentData, enrollmentId);

    return NextResponse.json({
      success: true,
      message: "Admin notification sent successfully",
    });
  } catch (error: any) {
    console.error("Admin notification error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send admin notification",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

async function sendAdminNotification(data: any, enrollmentId: string) {
  try {
    await resend.emails.send({
      from: "Enrollment System <info@houseoftutuacademy.com>",
      to: ["info@houseoftutuacademy.com", "info@houseoftutuacademy.com"],
      subject: `New Enrollment - ${data.receiptNumber}`,
      html: generateAdminNotificationHTML(data, enrollmentId),
    });

    return { success: true };
  } catch (error) {
    console.error("Admin email error:", error);
    return { success: false };
  }
}

function generateAdminNotificationHTML(
  data: any,
  enrollmentId: string
): string {
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
            <p><strong>Enrollment ID:</strong> ${enrollmentId}</p>
            <p><strong>Receipt:</strong> ${data.receiptNumber}</p>
            <p><strong>Name:</strong> ${data.fullName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phoneNumber}</p>
            <p><strong>Program:</strong> ${data.program}</p>
            <p><strong>Format:</strong> ${data.deliveryFormat}</p>
            <p><strong>Amount:</strong> ₦${data.totalAmount?.toLocaleString()}</p>
            <p><strong>Date:</strong> ${new Date(
              data.submissionDate
            ).toLocaleString()}</p>
          </div>
          
          <div class="info-box">
            <h3>Payment Information</h3>
            <p><strong>Method:</strong> ${data.paymentMethod}</p>
            <p><strong>Total Paid:</strong> ₦${data.totalAmount?.toLocaleString()}</p>
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
