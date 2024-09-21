import nodemailer from 'nodemailer';

export const sendMail = (from: string, to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: html
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      // logger.error(error);
    } else {
      // logger.info('Email sent: ' + info.response);
    }
  });
};
