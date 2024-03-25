import { Request, Response } from "express"
import Person from '../models/person.models'
import { Helper } from "../helpers/helper"
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

const helper = new Helper()

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
            try{
                const token = req.params.token
                const password = req.body.password
                const confirmPassword = req.body.confirm_password
                 
                const person = await Person.findOne({
                    where: { token }
                })

                if(person){
                    if(password === confirmPassword){
                        const passwordHash = await helper.generateHashPassword(password)
                    
                        person.setDataValue('senha', passwordHash)
                        person.setDataValue('token', null)
    
                        await person.save()
                        return res.redirect('/auth/login')
                    }
                }
            } catch(error){
                return res.status(500).json({ error: error })
            }
        }
    }

    static async login(req: Request, res: Response){
        if(req.method == 'GET'){
            try{
                return res.render('auth/login')
            }catch(error){
                return res.status(400).send('Error - ' + error)
            }
        }       

        else if(req.method == 'POST'){
            try{
                const { email, password } = req.body;
                const person = await Person.findOne({where: { email }})

                if(person){
                    if(await helper.comparePassword(person.dataValues.senha, password) && person.dataValues.email == email){
                        console.log(person)
                        
                        const token = jwt.sign({ id: person.dataValues.id, email: person.dataValues.email }, '123', { expiresIn: '1h' });
                        res.cookie('jwt', token, { httpOnly: true })
                        return res.status(200).json({ message: 'Login successful', token });
                    }else{
                        return res.status(401).json({ message: 'Invalid email or password' })
                    }
                }

            }catch(error){
                return res.status(400).send('Error - ' + error)
            }
        }

    }
}