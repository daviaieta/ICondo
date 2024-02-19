import { Request, Response } from "express"
import Person from '../models/person.models'
import Unit from "../models/unit.models"
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
        if(req.method == 'get'){
            try{
                const units = await Unit.findAll()
                return res.render('people/create', { units })
            }catch(error){
                return res.status(500).json({ error: error })
            }
        }
        
        else{
            const {
                nome, sobrenome, data_nascimento, cpf,
                telefone, email, operador, administrador,
                morador, super_admin, primeiro_acesso, token, data_cadastro,
                id_unidade
            } = req.body

           const tokenScript = nome + cpf + email
           const generatedToken = await bcrypt.hash(tokenScript, 10)

        try{
            if(primeiro_acesso == 'sim'){
                
            }else{
                
            }
        }catch(error){
            return res.status(500).json({ error: error })
        }
        
        }
    }
}