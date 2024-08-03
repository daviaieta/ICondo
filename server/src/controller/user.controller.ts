import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { Helper } from '../lib/helper'
import { parse, format } from 'date-fns'

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
      const user = req.body
      console.log(user)

      const token = await helper.generateHashToken(user.nome, user.cpf, user.telefone)
      const formattedDate = format(
        parse(user.dataNascimento, 'dd/MM/yyyy', new Date()),
        'yyyy-MM-dd',
      )
      console.log(formattedDate)

      const userObj = {
        nome: user.name,
        cpf: user.cpf,
        data_nascimento: formattedDate,
        email: user.email,
        senha: user.password,
        token: token,
        cargo: user.cargo,
        condominioId: user.condominioId,
      }
      // helper.sendMailFirstAcess(user.email, token)
      const createdUser = await prisma.user.create({
        data: userObj,
      })

      return res.send(createdUser)
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  }
}
