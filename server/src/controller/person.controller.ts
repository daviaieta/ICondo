import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { Helper } from '../lib/helper'

const helper = new Helper()

export class PersonController {
  static async listPeople(req: Request, res: Response) {
    try {
      const people = await prisma.user.findMany({})
      return res.status(200).json(people)
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  static async createPerson(req: Request, res: Response) {
    try {
      const person = req.body
      if (person.primeiro_acesso == 's') {
        const token = await helper.generateHashToken(person.nome, person.cpf, person.telefone)
        person.token = token

        helper.sendMailFirstAcess(person.email, token)
      }
      await prisma.user.create(person)

      return res.status(200).json({ person })
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}
