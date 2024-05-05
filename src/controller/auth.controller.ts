import { Request, Response } from 'express'
import Person from '../models/person.models'
import { Helper } from '../helpers/helper'
import jwt from 'jsonwebtoken'
import path from 'path'

const helper = new Helper()

export class AuthController {
  static async finishRegistration(req: Request, res: Response) {
    if (req.method == 'GET') {
      try {
        const token = req.params.token
        const person = await Person.findOne({
          where: { token },
        })
        if (person) {
          return res.render('auth/finishRegistration', { person, token })
        } else {
          return res.status(400).send('Invalid Token')
        }
      } catch (error) {
        return res.status(500).json({ error: error })
      }
    } else {
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
            return res.redirect('/auth/login')
          }
        }
      } catch (error) {
        return res.status(500).json({ error: error })
      }
    }
  }

  static async login(req: Request, res: Response) {
    if (req.method == 'GET') {
      try {
        return res.sendFile(
          path.join(__dirname, '../', 'views', 'auth', 'login.html'),
        )
      } catch (error) {
        return res.status(400).send('Error - ' + error)
      }
    } else {
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

            const token = jwt.sign(tokenData, '123', { expiresIn: '1h' })
            res.cookie('jwt', token, { httpOnly: true })

            await Person.update(
              { login_token: token },
              { where: { id_pessoa: person.dataValues.id_pessoa } },
            )

            return res.status(200).json({ message: 'Login successful', token })
          } else {
            return res
              .status(401)
              .json({ message: 'Invalid email or password' })
          }
        }
      } catch (error) {
        return res.status(400).send('Error - ' + error)
      }
    }
  }

  static async logout(req: Request, res: Response) {
    if (req.method == 'GET') {
      try {
        return res.render('auth/logout')
      } catch (error) {
        return res.status(400).send('Error - ' + error)
      }
    } else {
      try {
        res.clearCookie('jwt')
        return res.redirect('/auth/login')
      } catch (error) {
        return res.status(400).json({ message: 'Error - ' + error })
      }
    }
  }

  static async showProfile(req: Request, res: Response) {
    if (req.method == 'GET') {
      try {
        const token = req.cookies['jwt']
        const person = await Person.findOne({ where: { login_token: token } })
        const personInfo = person?.dataValues

        return res.render('auth/profile', { personInfo })
      } catch (error) {
        return res.status(400).json({ message: 'error - ' + error })
      }
    }
  }
}
