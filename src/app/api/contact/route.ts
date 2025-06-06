import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  preferredContact?: string;
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== Contact API Route Started ===');
    
    const data: ContactFormData = await request.json();
    console.log('Received contact form data:', { ...data, email: '***' });

    // Basic validation
    const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
    
    for (const field of requiredFields) {
      if (!data[field as keyof ContactFormData] || !String(data[field as keyof ContactFormData]).trim()) {
        console.log(`Validation failed: Missing field ${field}`);
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      console.log('Validation failed: Invalid email format');
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    console.log('Form validation passed');

    // Check environment variables
    const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'COMPANY_EMAIL'];
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        console.error(`Missing environment variable: ${envVar}`);
        return NextResponse.json(
          { error: 'Server configuration error' },
          { status: 500 }
        );
      }
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Company email HTML
    const companyEmailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
        <div style="background: linear-gradient(to right, #1e2761, #4f4f4f); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">New Contact Form Message</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">From Bro's Construction Website</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #1e2761; border-bottom: 2px solid #f5a623; padding-bottom: 10px; margin-top: 0;">Contact Information</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1e2761; width: 30%;">Name:</td>
              <td style="padding: 8px 0;">${data.firstName} ${data.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1e2761;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #f5a623; text-decoration: none;">${data.email}</a></td>
            </tr>
            ${data.phone ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1e2761;">Phone:</td>
              <td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #f5a623; text-decoration: none;">${data.phone}</a></td>
            </tr>
            ` : ''}
            ${data.preferredContact ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1e2761;">Preferred Contact:</td>
              <td style="padding: 8px 0;">${formatPreferredContact(data.preferredContact)}</td>
            </tr>
            ` : ''}
          </table>

          <h2 style="color: #1e2761; border-bottom: 2px solid #f5a623; padding-bottom: 10px;">Message Details</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1e2761; width: 30%;">Subject:</td>
              <td style="padding: 8px 0;">${formatSubject(data.subject)}</td>
            </tr>
          </table>

          <h2 style="color: #1e2761; border-bottom: 2px solid #f5a623; padding-bottom: 10px;">Message</h2>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #f5a623; margin-bottom: 20px;">
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>

          <div style="background: #e8f4f8; padding: 15px; border-radius: 5px; text-align: center; margin-top: 20px;">
            <p style="margin: 0; font-weight: bold; color: #1e2761;">Another chance to demonstrate Bro's Construction's exceptional customer service!</p>
          </div>
        </div>
      </div>
    `;

    // Customer confirmation email HTML
    const customerEmailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
        <div style="background: linear-gradient(to right, #1e2761, #4f4f4f); color: white; padding: 20px; text-align: center;">
          <img src="data:image/webp;base64,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" alt="Bro's Construction Logo" style="max-width: 150px; height: auto; margin-bottom: 10px;" />
          <h1 style="margin: 0; font-size: 24px;">Thank You for Contacting Us!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Premium Roofing & Custom Metal Siding</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #1e2761; margin-top: 0;">Hi ${data.firstName},</h2>
          
          <p style="line-height: 1.6; margin-bottom: 20px;">
            Thank you for reaching out to Bro's Construction. We've received your message about "${formatSubject(data.subject).toLowerCase()}" and appreciate you taking the time to contact us.
          </p>

          <div style="background: #e8f4f8; padding: 20px; border-radius: 5px; border-left: 4px solid #f5a623; margin: 20px 0;">
            <h3 style="color: #1e2761; margin-top: 0;">What happens next?</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">We'll review your message and respond within 24 hours</li>
              <li style="margin-bottom: 8px;">A member of our expert team will contact you via your preferred method</li>
              <li style="margin-bottom: 8px;">We'll answer any questions and discuss how we can help</li>
              <li>For project inquiries, we'll schedule a free consultation if needed</li>
            </ul>
          </div>

          <h3 style="color: #1e2761;">Your Message Summary:</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1e2761; width: 30%;">Subject:</td>
              <td style="padding: 8px 0;">${formatSubject(data.subject)}</td>
            </tr>
            ${data.preferredContact ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1e2761;">Preferred Contact:</td>
              <td style="padding: 8px 0;">${formatPreferredContact(data.preferredContact)}</td>
            </tr>
            ` : ''}
          </table>

          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              <strong>Need immediate assistance?</strong><br>
              Call us directly at <a href="tel:+8018670576" style="color: #f5a623; text-decoration: none; font-weight: bold;">(801) 867-0576</a><br>
              Monday - Friday: 7AM - 6PM
            </p>
          </div>

          <p style="margin-bottom: 0;">
            We look forward to working with you!<br>
            <strong>The Bro's Construction Team</strong>
          </p>
        </div>
      </div>
    `;

    console.log('Attempting to send company email...');
    // Send email to company
    try {
      const companyMailInfo = await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.COMPANY_EMAIL,
        subject: `Contact Form: ${formatSubject(data.subject)} - ${data.firstName} ${data.lastName}`,
        html: companyEmailHTML,
        replyTo: data.email,
      });
      console.log('Company email sent successfully:', companyMailInfo.messageId);
    } catch (emailError) {
      console.error('Failed to send company email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send notification email. Please try again or call us directly.' },
        { status: 500 }
      );
    }

    console.log('Attempting to send customer confirmation email...');
    // Send confirmation email to customer
    try {
      const customerMailInfo = await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: data.email,
        subject: 'Thank you for contacting Bro\'s Construction',
        html: customerEmailHTML,
      });
      console.log('Customer email sent successfully:', customerMailInfo.messageId);
    } catch (emailError) {
      console.error('Failed to send customer email:', emailError);
      // Don't fail the request if customer email fails, company email is more important
      console.log('Customer email failed, but continuing...');
    }

    console.log('=== Contact API Route Completed Successfully ===');
    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('=== Contact API Route Error ===');
    console.error('Error details:', error);
    
    return NextResponse.json(
      { error: 'Internal server error. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}

// Helper functions to format form data
function formatSubject(subject: string): string {
  const subjects: { [key: string]: string } = {
    'general-inquiry': 'General Inquiry',
    'project-question': 'Project Question',
    'estimate-request': 'Estimate Request',
    'existing-project': 'Existing Project',
    'warranty-claim': 'Warranty Claim',
    'emergency-repair': 'Emergency Repair',
    'partnership': 'Partnership/Business Inquiry',
    'other': 'Other'
  };
  return subjects[subject] || subject;
}

function formatPreferredContact(method: string): string {
  const methods: { [key: string]: string } = {
    'email': 'Email',
    'phone': 'Phone Call',
    'text': 'Text Message',
    'either': 'Either Email or Phone'
  };
  return methods[method] || method;
}