import nodemailer from 'nodemailer';

export const sendMail = (from: string, to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_HOST,
    port: 465,
    secure: true,
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      // logger.error(error);
    } else {
      console.log(info.response);
      // logger.info('Email sent: ' + info.response);
    }
  });
};
