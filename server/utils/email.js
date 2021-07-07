const nodemailer = require("nodemailer");
const { htmlToText } = require("html-to-text");

module.exports = class Email {
  constructor(user, message) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.message = message;
    this.from = `"SilverStore" <${process.env.EMAIL_ID}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(subject) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: this.message,
      text: htmlToText(this.message),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendPasswordResetToken() {
    await this.send("Your password reset token! Valid for only 10 minutes.");
  }

  async sendWelcome() {
    await this.send("Successfully created account!");
  }
};
