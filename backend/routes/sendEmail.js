import express from 'express';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

import Signature from '../models/Signature.js';

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
});

router.post('/send-email', async (req, res) => {
  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const defaultSignature = await Signature.findOne({ isDefault: true });

    let finalBody = body;
    if (defaultSignature?.html) {
      finalBody += `<br/><br/>${defaultSignature.html}`;
    }

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html: finalBody,
    });

    res.status(200).json({ message: 'Email sent successfully with signature' });
  } catch (err) {
    console.error('❌ Error sending email:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;
