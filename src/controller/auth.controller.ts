import { Request, Response } from "express"
import Person from '../models/person.models'

export class AuthController{
    static async finishRegistration(req: Request, res: Response){
        if(req.method == 'GET'){
            try{
                const token = req.params.token
                const person = await Person.findOne({
                    where: { token }
                })
                if(person){
                    return res.render('auth/finishRegistration', { person, token })
                }else{
                    return res.status(400).send('Invalid Token')
                }
    
            } catch(error){
                return res.status(500).json({ error: error })
            }
        }
        
        else if(req.method == 'POST'){
            
        }
    }
}