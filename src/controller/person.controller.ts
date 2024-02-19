import { Request, Response } from "express"
import Person from '../models/person.models'

export class PersonController{
    static async listPeople(req: Request, res: Response){
        try{
            const people = await Person.findAll()
            return res.render('people/list', { people })
        } catch(error){
            return res.status(500).json({ error: error })
        }
    }
}