import type { NextApiRequest, NextApiResponse } from 'next';
import sendgrid from '@sendgrid/mail';
import { verifySolution } from 'altcha-lib';

// Set the SendGrid API key
sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '');

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
    altcha: token
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
    !terms_accepted ||
    !token
  ) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Verify the Altcha token
  try {
    if (!process.env.ALTCHA_HMAC_KEY) {
      throw new Error('ALTCHA_HMAC_KEY environment variable is not set');
    }
    const isValid = await verifySolution(token, process.env.ALTCHA_HMAC_KEY);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid captcha' });
    }
  } catch (error) {
    console.error('Altcha verification error:', error);
    return res.status(400).json({ error: 'Failed to verify captcha' });
  }

  try {
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
