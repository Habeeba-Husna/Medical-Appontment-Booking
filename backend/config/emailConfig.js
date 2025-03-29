import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Configure Transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send Email Function
export const sendNotification = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: `<p>${text}</p>`,
      // text,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent:', {to,subject,status: 'Success'});
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email sending failed');
  }
};
