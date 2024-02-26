require('dotenv').config()
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

const sendMail = (toEmail?: string, subject?: string, emailBody?: string) =>{
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: toEmail,
        subject: subject,
        text: emailBody
    }
    return transporter.sendMail(mailOptions)
}

export default sendMail