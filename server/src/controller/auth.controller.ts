import { Request, Response } from 'express'
import { Helper } from '../lib/helper'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma'

const helper = new Helper()

export class AuthController {
  static async auth(req: Request, res: Response) {
    return res.status(200).json({})
  }
  static async login(req: Request, res: Response) {
    try {
      const { cpf, password } = req.body

      if (!cpf || !password) {
        return res.status(400).send({
          error: 'CPF and password are required',
        })
      }

      const user = await prisma.user.findUnique({
        where: {
          cpf,
        },
      })

      if (!user) {
        return res.status(404).send({ message: 'User not found' })
      }

      const passwordMatch = helper.comparePassword(password, user.senha)

      if (!passwordMatch) {
        return res.status(401).send({
          error: 'Incorrect password',
        })
      }

      const token = jwt.sign({ id: user.id }, '123', { expiresIn: '24h' })
      const cleanToken = token.replace(/\//g, '')

      const updatedUser = await prisma.user.update({
        where: { cpf },
        data: { token: cleanToken },
        select: { token: true },
      })

      res.send(updatedUser)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  static async finishRegistration(req: Request, res: Response) {
    try {
      const token = req.params.token
      const password = req.body.password
      const confirmPassword = req.body.confirm_password

      const person = await prisma.user.findUnique({
        where: { token },
      })

      if (person) {
        if (password === confirmPassword) {
          const passwordHash = await helper.generateHashPassword(password)

          // person.setDataValue('senha', passwordHash)
          // person.setDataValue('token', null)

          return res.status(200).json({ person })
        }
      }
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      res.clearCookie('jwt')
      return res.json({})
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  static async showProfile(req: Request, res: Response) {
    try {
      const token = req.cookies['jwt']
      const user = await prisma.user.findUnique({ where: { token } })

      return res.json({ user })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}
