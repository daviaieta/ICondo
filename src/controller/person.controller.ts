import { Request, Response } from "express"
import Person from '../models/person.models'
import Unit from "../models/unit.models"
import Condominium from '../models/condominium.models'
import { Helper } from "../helpers/helper"

const helper = new Helper()

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
        
        else if(req.method == 'POST'){
            try{
                const person = req.body
                if(person.primeiro_acesso == 's'){
                    // validar erro antes
                    const token = await helper.generateHashToken(person.nome, person.cpf, person.telefone)
                    person.token = token

                    helper.sendMailFirstAcess(person.email, token)
                }

                await Person.create(person)
                return res.redirect('/people')
            }catch(error){
                return res.status(500).json({ error: error })
            }
        
        }
    }
}