import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export class CondoController {
  static async list(req: Request, res: Response) {
    try {
      const condos = await prisma.condominio.findMany({})
      return res.status(200).json(condos)
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  static async create(req: Request, res: Response) {
    const condo = req.body
    try {
      await prisma.condominio.create({
        data: condo,
      })
      return res.send(condo)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error })
    }
  }

  static async delete(req: Request, res: Response) {
    const condoId = req.body.id
    try {
      await prisma.condominio.delete({
        where: { id: condoId },
      })
      return res.status(200).json({})
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}
