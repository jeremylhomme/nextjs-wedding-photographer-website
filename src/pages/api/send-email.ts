'use server';

import type { NextApiRequest, NextApiResponse } from 'next';
import sendgrid from '@sendgrid/mail';

// Set the SendGrid API key
sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '');

async function verifyRecaptcha(token: string) {
  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `secret=${process.env.CAPTCHA_SECRET_KEY}&response=${token}`
    }
  );

  const data = await response.json();
  return data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    first_name,
    last_name,
    email,
    event_date,
    work_type,
    work_category,
    knowing_source,
    message,
    terms_accepted,
    recaptchaToken
  } = req.body;

  // Validate the request body
  if (
    !first_name ||
    !last_name ||
    !email ||
    !event_date ||
    !work_type ||
    !work_category ||
    !knowing_source ||
    !message ||
    !terms_accepted
  ) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Verify reCAPTCHA token
  if (!recaptchaToken) {
    return res.status(400).json({ error: 'reCAPTCHA verification failed' });
  }

  try {
    // Verify the reCAPTCHA token
    console.log('Verifying reCAPTCHA...');
    const recaptchaVerification = await verifyRecaptcha(recaptchaToken);

    if (!recaptchaVerification.success || recaptchaVerification.score < 0.5) {
      console.error('reCAPTCHA verification failed:', recaptchaVerification);
      return res.status(400).json({ error: 'reCAPTCHA verification failed' });
    }
    console.log('reCAPTCHA verified successfully');

    const templateId = process.env.SENDGRID_TEMPLATE_ID;
    if (!templateId) {
      throw new Error('SendGrid template ID is not configured');
    }

    // Helper function to escape special characters for Handlebars
    const escapeHandlebars = (str: string | undefined | null) => {
      if (!str) return '';
      return str.replace(/[&"']/g, char => {
        switch (char) {
          case '&':
            return '{{{&}}}';
          case '"':
            return '{{{"}}}';
          case "'":
            return "{{{'}}}";
          default:
            return char;
        }
      });
    };

    console.log('Preparing email data...');
    const emailData = {
      to: 'bonjour@jeremydan.fr',
      from: {
        email: 'bonjour@jeremydan.fr',
        name: 'Jeremy Dan'
      },
      replyTo: {
        email,
        name: `${first_name} ${last_name}`
      },
      templateId,
      dynamicTemplateData: {
        first_name: escapeHandlebars(first_name),
        last_name: escapeHandlebars(last_name),
        email: escapeHandlebars(email),
        event_date: event_date ? new Date(event_date).toLocaleDateString() : '',
        work_type: escapeHandlebars(work_type),
        work_category: escapeHandlebars(work_category),
        knowing_source: escapeHandlebars(knowing_source),
        message: escapeHandlebars(message),
        terms_accepted: escapeHandlebars(terms_accepted)
      }
    };
    console.log('Email data prepared:', emailData);

    // Send the email using SendGrid
    console.log('Sending email via SendGrid...');
    const result = await sendgrid.send(emailData);
    console.log('SendGrid response:', result);

    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error: any) {
    console.error('SendGrid Error:', error);
    if (error.response) {
      console.error('SendGrid Response Error:', {
        body: error.response.body,
        headers: error.response.headers,
        status: error.response.statusCode
      });
    }
    return res.status(500).json({
      error: 'Failed to send email',
      details: error.response?.body || error.message
    });
  }
}
