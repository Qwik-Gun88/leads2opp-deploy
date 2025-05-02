import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.com',
  port: 587,
  secure: false,
  auth: {
    user: 'fiyaz@leads2opp.com',
    pass: process.env.IONOS_PASSWORD,
  },
});

const sendEmail = async (to, subject, htmlBody) => {
  const mailOptions = {
    from: '"Fiyaz from Leads2Opp" <fiyaz@leads2opp.com>',
    to,
    subject,
    html: htmlBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error(`❌ Failed to send email: ${err.message}`);
    throw err;
  }
};

export default sendEmail;
