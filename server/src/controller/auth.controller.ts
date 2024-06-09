import { Request, Response } from 'express'
import { Helper } from '../lib/helper'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma'

const helper = new Helper()

export class AuthController {
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

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const user = await prisma.user.findUnique({ where: email })

      if (user) {
        if ((await helper.comparePassword(user.password, password)) && user.email == email) {
          const tokenData = {
            id: user.id,
          }
          const token = jwt.sign(tokenData, '123', { expiresIn: '24h' })
          res.cookie('jwt', token, { httpOnly: true })

          await prisma.user.update({
            where: { id: user.id },
            data: { token },
          })

          return res.status(200).json({ user })
        } else {
          return res.status(404).json({ message: 'user not found' })
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
