// const nodemailer = require("nodemailer");

// const sendEmail = async (to, subject, text) => {
//   try {
//     // Create a transporter object using Gmail
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       // host: "smtp.gmail.com",
//       secure: false,
//       port: 587,
//       auth: {
//         user: process.env.EMAIL_USER, // Your Gmail address
//         pass: process.env.EMAIL_PASS, // Your Gmail App Password
//       },
//     });

//     // Email options
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       text,
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);
//     console.log(`Email sent to ${to}`);
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error("Failed to send email");
//   }
// };

// module.exports = sendEmail;

const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    // Create a transporter object using Gmail
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // Use port 587 for STARTTLS
      secure: false, // Use STARTTLS (not SSL/TLS)
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail App Password
      },
      tls: {
        rejectUnauthorized: false, // Optional: for testing only
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
