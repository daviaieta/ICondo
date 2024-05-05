import { Request, Response } from 'express'
import Person from '../models/person.models'
import { Helper } from '../helpers/helper'

const helper = new Helper()

export class PersonController {
  static async listPeople(req: Request, res: Response) {
    try {
      const people = await Person.findAll()
      return res.status(200).json({
        sucess: true,
        data: people,
      })
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        error: error,
      })
    }
  }

  static async createPerson(req: Request, res: Response) {
    try {
      const person = req.body
      if (person.primeiro_acesso == 's') {
        const token = await helper.generateHashToken(
          person.nome,
          person.cpf,
          person.telefone,
        )
        person.token = token

        helper.sendMailFirstAcess(person.email, token)
      }
      await Person.create(person)

      return res.status(200).json({
        sucess: true,
        data: 'successfully created',
      })
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        error: error,
      })
    }
  }
}
