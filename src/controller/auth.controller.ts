import { Request, Response } from 'express'
import Person from '../models/person.models'
import { Helper } from '../helpers/helper'
import jwt from 'jsonwebtoken'

const helper = new Helper()

export class AuthController {
  static async finishRegistration(req: Request, res: Response) {
    try {
      const token = req.params.token
      const password = req.body.password
      const confirmPassword = req.body.confirm_password

      const person = await Person.findOne({
        where: { token },
      })

      if (person) {
        if (password === confirmPassword) {
          const passwordHash = await helper.generateHashPassword(password)

          person.setDataValue('senha', passwordHash)
          person.setDataValue('token', null)

          await person.save()
          return res.status(200).json({
            suucess: true,
            data: 'successfully Registration',
          })
        }
      }
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        sucess: false,
        error: error,
      })
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const person = await Person.findOne({ where: { email } })

      if (person) {
        if (
          (await helper.comparePassword(person.dataValues.senha, password)) &&
          person.dataValues.email == email
        ) {
          const tokenData = {
            id: person.dataValues.id_pessoa,
          }
          const token = jwt.sign(tokenData, '123', { expiresIn: '24h' })
          res.cookie('jwt', token, { httpOnly: true })

          await Person.update(
            { login_token: token },
            { where: { id_pessoa: person.dataValues.id_pessoa } },
          )

          return res.status(200).json({
            sucess: true,
            data: 'successfully login',
          })
        } else {
          return res.status(400).json({
            sucess: false,
            error: 'email or password is not correct',
          })
        }
      }
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        error: error,
      })
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      res.clearCookie('jwt')
      return res.json({
        sucess: true,
        data: 'successfully logout',
      })
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        error: error,
      })
    }
  }

  static async showProfile(req: Request, res: Response) {
    try {
      const token = req.cookies['jwt']
      const person = await Person.findOne({ where: { login_token: token } })
      const personInfo = person?.dataValues

      return res.json({
        sucess: true,
        data: personInfo,
      })
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        error: error,
      })
    }
  }
}
