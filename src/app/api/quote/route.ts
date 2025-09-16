import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface QuoteRequestData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  serviceType: string;
  projectType: string;
  roofType?: string;
  propertyType: string;
  projectTimeline?: string;
  projectDescription: string;
  preferredContact?: string;
  timeline?: string;
  budget?: string;
  currentIssues?: string[];
  hearAboutUs?: string;
  turnstileToken?: string;
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== Quote API Route Started ===');
    
    const data: QuoteRequestData = await request.json();
    console.log('Received form data:', { ...data, email: '***', phone: '***', turnstileToken: data.turnstileToken ? 'PROVIDED' : 'MISSING' }); // Hide sensitive data in logs

    // Verify Turnstile token
    if (!data.turnstileToken) {
      console.log('Turnstile validation failed: No token provided');
      return NextResponse.json(
        { error: 'Security verification failed' },
        { status: 400 }
      );
    }

    console.log('Verifying Turnstile token...');
    try {
      const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY || '',
          response: data.turnstileToken,
        }),
      });

      const turnstileResult = await turnstileResponse.json();
      console.log('Turnstile verification result:', { success: turnstileResult.success });

      if (!turnstileResult.success) {
        console.log('Turnstile validation failed:', turnstileResult['error-codes']);
        return NextResponse.json(
          { error: 'Security verification failed' },
          { status: 400 }
        );
      }

      console.log('Turnstile verification passed');
    } catch (turnstileError) {
      console.error('Turnstile verification error:', turnstileError);
      return NextResponse.json(
        { error: 'Security verification failed' },
        { status: 500 }
      );
    }

    // Basic validation
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'zipCode', 'projectType', 'propertyType', 'projectDescription'];
    
    for (const field of requiredFields) {
      if (!data[field as keyof QuoteRequestData] || !String(data[field as keyof QuoteRequestData]).trim()) {
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
    const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'COMPANY_EMAIL', 'TURNSTILE_SECRET_KEY'];
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
    console.log('SMTP Config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      user: process.env.SMTP_USER ? '***' : 'missing',
      from: process.env.SMTP_FROM,
      to: process.env.COMPANY_EMAIL
    });

    // Create email transporter with detailed config
    const transporterConfig = {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      debug: true, // Enable debug output
      logger: true, // Log to console
    };

    console.log('Creating transporter with config:', {
      ...transporterConfig,
      auth: { user: '***', pass: '***' }
    });

    const transporter = nodemailer.createTransport(transporterConfig);

    // Test the connection
    console.log('Testing SMTP connection...');
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError);
      return NextResponse.json(
        { error: 'Email server connection failed. Please try again later.' },
        { status: 500 }
      );
    }

    // Company Email HTML
    const companyEmailHTML = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
    <div style="background: linear-gradient(to right, #1e2761, #4f4f4f); color: white; padding: 20px; text-align: center;">
      <h1 style="margin: 0; font-size: 24px;">New Quote Request</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">From Bro's Construction Website</p>
    </div>
    
    <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px;">
      <h2 style="color: #1e2761; border-bottom: 2px solid #f5a623; padding-bottom: 10px; margin-top: 0;">Customer Information</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #1e2761; width: 30%;">Name:</td>
          <td style="padding: 8px 0;">${data.firstName} ${data.lastName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #1e2761;">Email:</td>
          <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #f5a623; text-decoration: none;">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #1e2761;">Phone:</td>
          <td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #f5a623; text-decoration: none;">${data.phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #1e2761;">Address:</td>
          <td style="padding: 8px 0;">${data.address}<br>${data.city}, ${data.state} ${data.zipCode}</td>
        </tr>
        ${data.preferredContact ? `
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #1e2761;">Preferred Contact:</td>
          <td style="padding: 8px 0;">${formatPreferredContact(data.preferredContact)}</td>
        </tr>
        ` : ''}
      </table>

      <h2 style="color: #1e2761; border-bottom: 2px solid #f5a623; padding-bottom: 10px;">Project Details</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #1e2761; width: 30%;">Service Type:</td>
          <td style="padding: 8px 0;">${formatServiceType(data.serviceType)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #1e2761;">Property Type:</td>
          <td style="padding: 8px 0;">${formatPropertyType(data.propertyType)}</td>
        </tr>
        ${data.projectTimeline ? `
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #1e2761;">Timeline:</td>
          <td style="padding: 8px 0;">${formatTimeline(data.projectTimeline)}</td>
        </tr>
        ` : ''}
        ${data.budget ? `
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #1e2761;">Budget Range:</td>
          <td style="padding: 8px 0;">${formatBudget(data.budget)}</td>
        </tr>
        ` : ''}
        ${data.currentIssues && data.currentIssues.length > 0 ? `
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #1e2761;">Current Issues:</td>
          <td style="padding: 8px 0;">${data.currentIssues.map(issue => formatCurrentIssue(issue)).join(', ')}</td>
        </tr>
        ` : ''}
      </table>

      ${data.projectDescription ? `
      <h2 style="color: #1e2761; border-bottom: 2px solid #f5a623; padding-bottom: 10px;">Project Description</h2>
      <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #f5a623; margin-bottom: 20px;">
        <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${data.projectDescription}</p>
      </div>
      ` : ''}

      <div style="background: #e8f4f8; padding: 15px; border-radius: 5px; text-align: center; margin-top: 20px;">
        <p style="margin: 0; font-weight: bold; color: #1e2761;">Potential new project to add to your portfolio of satisfied customers!</p>
      </div>
    </div>
  </div>
`;

    // Customer confirmation email HTML
    const customerEmailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
        <div style="background: linear-gradient(to right, #1e2761, #4f4f4f); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Thank You for Your Quote Request!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Premium Roofing & Custom Metal Siding</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #1e2761; margin-top: 0;">Hi ${data.firstName},</h2>
          
          <p style="line-height: 1.6; margin-bottom: 20px;">
            Thank you for reaching out to Bro's Construction for your ${formatPropertyType(data.propertyType).toLowerCase()} project. We've received your quote request and are excited to help you with your roofing and siding needs.
          </p>

          <div style="background: #e8f4f8; padding: 20px; border-radius: 5px; border-left: 4px solid #f5a623; margin: 20px 0;">
            <h3 style="color: #1e2761; margin-top: 0;">What happens next?</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">We'll contact you within 24 hours to discuss your project</li>
              <li style="margin-bottom: 8px;">Schedule a free on-site consultation at your convenience</li>
              <li style="margin-bottom: 8px;">Provide you with a detailed, written quote</li>
              <li>Answer any questions you may have about the project</li>
            </ul>
          </div>

          <h3 style="color: #1e2761;">Your Project Summary:</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1e2761; width: 30%;">Project Type:</td>
              <td style="padding: 8px 0;">${formatPropertyType(data.propertyType)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1e2761;">Property:</td>
              <td style="padding: 8px 0;">${data.address}, ${data.city}, UT ${data.zipCode}</td>
            </tr>
            ${data.timeline ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1e2761;">Timeline:</td>
              <td style="padding: 8px 0;">${formatTimeline(data.timeline)}</td>
            </tr>
            ` : ''}
          </table>

          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              <strong>Questions or need immediate assistance?</strong><br>
              Call us directly at <a href="tel:+8018670576" style="color: #f5a623; text-decoration: none; font-weight: bold;">(801) 867-0576</a>
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
        subject: `New Quote Request: ${data.firstName} ${data.lastName} - ${formatPropertyType(data.propertyType)}`,
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
        subject: 'Your Quote Request - Bro\'s Construction',
        html: customerEmailHTML,
      });
      console.log('Customer email sent successfully:', customerMailInfo.messageId);
    } catch (emailError) {
      console.error('Failed to send customer email:', emailError);
      // Don't fail the request if customer email fails, company email is more important
      console.log('Customer email failed, but continuing...');
    }

    console.log('=== Quote API Route Completed Successfully ===');
    return NextResponse.json(
      { message: 'Quote request submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('=== Quote API Route Error ===');
    console.error('Error details:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { error: 'Internal server error. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}

// Helper functions to format form data
function formatServiceType(serviceType: string): string {
  const services: { [key: string]: string } = {
    'roofing': 'Roofing',
    'siding': 'Siding',
    'both': 'Roofing & Siding',
    'repair': 'Repair Services',
    'maintenance': 'Maintenance Services',
    'inspection': 'Inspection Services'
  };
  return services[serviceType] || serviceType;
}

function formatPropertyType(propertyType: string): string {
  const properties: { [key: string]: string } = {
    'residential': 'Residential Home',
    'commercial': 'Commercial Building',
    'multi-family': 'Multi-Family Property',
    'industrial': 'Industrial Building'
  };
  return properties[propertyType] || propertyType;
}

function formatTimeline(timeline: string): string {
  const timelines: { [key: string]: string } = {
    'asap': 'As Soon As Possible',
    '1-month': 'Within 1 Month',
    '2-3-months': '2-3 Months',
    '3-6-months': '3-6 Months',
    'planning': 'Planning Phase'
  };
  return timelines[timeline] || timeline;
}

function formatBudget(budget: string): string {
  const budgets: { [key: string]: string } = {
    'under-10k': 'Under $10,000',
    '10k-25k': '$10,000 - $25,000',
    '25k-50k': '$25,000 - $50,000',
    '50k-100k': '$50,000 - $100,000',
    'over-100k': 'Over $100,000',
    'not-sure': 'Not Sure / Need Estimate'
  };
  return budgets[budget] || budget;
}

function formatCurrentIssue(issue: string): string {
  const issues: { [key: string]: string } = {
    'leaks': 'Leaks',
    'damage': 'Storm/Wind Damage',
    'age': 'Age-Related Wear',
    'energy': 'Energy Efficiency Issues',
    'aesthetic': 'Aesthetic Upgrade',
    'maintenance': 'High Maintenance',
    'insurance': 'Insurance Claim'
  };
  return issues[issue] || issue;
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