import { Request, Response } from "express"
import Person from '../models/person.models'
import Unit from "../models/unit.models"
import Condominium from '../models/condominium.models'
import bcrypt from 'bcrypt'

export class PersonController{
    static async listPeople(req: Request, res: Response){
        try{
            const people = await Person.findAll()
            return res.render('people/list', { people })
        } catch(error){
            return res.status(500).json({ error: error })
        }
    }
    static async createPerson(req: Request, res: Response){
        if(req.method == 'GET'){
            try{
                const units = await Unit.findAll()
                const condominiums = await Condominium.findAll()
                return res.render('people/create', { units, condominiums })
            }catch(error){
                return res.status(500).json({ error: error })
            }
        }
        
        else{
            const person = req.body
            
            const tokenScript = `${person.nome}${person.cpf}${person.email}`
            const generatedToken = await bcrypt.hash(tokenScript, 10)

            try{
                if(person.primeiro_acesso == 'sim'){
                    
                }
                await Person.create(person)
                return res.redirect('/people')
            }catch(error){
                return res.status(500).json({ error: error })
            }
        
        }
    }
}