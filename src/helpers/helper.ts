import bcrypt from 'bcrypt'
import sendMail from '../services/mail'

export class Helper{
    public async generateHashToken(req1: any, req2: any, req3: any) {
        const tokenScript = `${req1}${req2}${req3}`
        const generatedToken = await bcrypt.hash(tokenScript, 10)
        return generatedToken
    }

    public async generateHashPassword(password: any){
        return await bcrypt.hash(password, 10)
    }

    public async comparePassword(password1: any, password2: any){
        return await bcrypt.compare(password2, password1)
    }

    public async sendMailFirstAcess(toEmail: string, token: any) {
        const link = `http://localhost:3000/auth/finish-registration/${token}`
        const subject = 'complete your registration'
        const emailBody = `[iCondo] Segue o link
                        para a finalização do cadastro: ${link}`
        
        return await sendMail(toEmail, subject, emailBody)
    }
}