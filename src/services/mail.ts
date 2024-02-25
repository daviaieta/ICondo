require('dotenv').config()
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.MAILPASSORD
    }
})

const sendMail = (from?: string, to?: string, subject?: string, html?: string) =>{
    const mailOptions = {
        from: process.env.MAILUSER,
        to: to,
        subject: subject,
        html: html
    }
    // Debug
    console.log(mailOptions)

    return transporter.sendMail(mailOptions, function (error, info){
        if(error){
            return error
        } else{
            return console.log('Email sent !')
        }
    })
}

export default sendMail