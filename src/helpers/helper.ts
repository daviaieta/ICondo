import bcrypt from 'bcrypt'

export class Helper{
    public async generateHashToken(req1: any, req2: any, req3: any) {
        const tokenScript = `${req1}${req2}${req3}`
        const generatedToken = await bcrypt.hash(tokenScript, 10)
        return generatedToken
    }
}