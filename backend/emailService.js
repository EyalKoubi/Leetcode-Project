const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // ה-API KEY שלך

const sendEmail = async (to, subject, text) => {
  try {
    const msg = {
      to, // כתובת הנמען
      from: process.env.SENDGRID_EMAIL, // **חייב להיות כתובת מאומתת ב-SendGrid**
      subject,
      text,
    };

    await sgMail.send(msg);
    console.log("✅ Email sent successfully to", to);
  } catch (error) {
    console.error(
      "❌ Error sending email:",
      error.response ? error.response.body : error
    );
  }
};

module.exports = sendEmail;
