const nodemailer = require('nodemailer')

const sendEmail = async (option)=>{
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "e450e4cc25a4c1",
          pass: "d7894e4ddbf547"
        }
      });

      const mailOption = {
        from:'armia.iiarmia@gmail.com',
        to:'test@gmail.com',
        subject:option.subject,
        text:option.text
      }

      await transport.sendMail(mailOption)
}

module.exports = sendEmail