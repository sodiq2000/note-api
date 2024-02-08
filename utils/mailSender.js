const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    let info = await transporter.sendMail({
      from: 'codinery@gmail.com',
      to: `${email}`,
      subject: `${title}`,
      html: `${ body }`
      })
      console.log('email info:', info)
      return info;
  } catch (error) {
    console.log("mail sender:", error);
  }
};

module.exports = mailSender;
