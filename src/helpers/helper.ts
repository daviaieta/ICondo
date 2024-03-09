import bcrypt from 'bcrypt'
import sendMail from '../services/mail'

export class Helper{
    public async generateHashToken(req1: any, req2: any, req3: any) {
        const tokenScript = `${req1}${req2}${req3}`
        const generatedToken = await bcrypt.hash(tokenScript, 10)
        return generatedToken
    }

    public async sendMailFirstAcess(toEmail: string, token: any) {
        const link = `http://localhost:3000/auth/finish-registration/${token}`
        const subject = 'complete your registration'
        const emailBody = `[iCondo] Segue o link
                        para a finalização do cadastro: ${link}`
        
        return await sendMail(toEmail, subject, emailBody)
    }
}