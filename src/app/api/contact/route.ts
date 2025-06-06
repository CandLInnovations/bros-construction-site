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
    console.log('=== Contact API Function Started ===');
    console.log('Environment Variables Check:', {
      SMTP_HOST: process.env.SMTP_HOST || 'MISSING',
      SMTP_PORT: process.env.SMTP_PORT || 'MISSING',
      SMTP_USER: process.env.SMTP_USER || 'MISSING', 
      SMTP_PASS: process.env.SMTP_PASS ? 'SET' : 'MISSING',
      SMTP_FROM: process.env.SMTP_FROM || 'MISSING',
      COMPANY_EMAIL: process.env.COMPANY_EMAIL || 'MISSING'
    });

    const data: ContactFormData = await request.json();
    console.log('Form data received:', Object.keys(data));
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

    console.log('Environment variables check passed');

    // Create email transporter
    console.log('Creating email transporter...');
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

  } catch (error: any) {
    console.error('=== CRITICAL ERROR ===');
    console.error('Error type:', error.constructor?.name || 'Unknown');
    console.error('Error message:', error.message || 'No message');
    console.error('Error stack:', error.stack || 'No stack trace');
    
    return NextResponse.json(
      { error: `Server error: ${error.message || 'Unknown error'}` },
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