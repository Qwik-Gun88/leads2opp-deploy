import express from 'express';
import sendEmail from '../utils/emailSender.js';
import db from '../utils/firebase.js';

const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await sendEmail(to, subject, body);
    await db.collection('email_logs').add({
        to,
        subject,
        body,
        sentAt: new Date(),
      });
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('❌ Error sending email:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;
