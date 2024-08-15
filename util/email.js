const nodemailer = require('nodemailer');

const sendEmail = async (option) => {
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "924c62d694644e",
          pass: "92a0791e0114f8"
        }
      });

    const mailOption = {
        from: 'armia@gmail.com',
        to:option.userEmail,
        subject: option.subject,
        html:option.html
    }


    await transport.sendMail(mailOption);

};

module.exports = sendEmail;