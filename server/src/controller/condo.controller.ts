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
    try {
      const condo = req.body
      const createdCondo = await prisma.condominio.create({
        data: condo,
      })
      return res.send(createdCondo)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error })
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const condoId = req.body.id
      await prisma.condominio.delete({
        where: { id: condoId },
      })
      return res.status(200).json({})
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const condo = req.body

      const updatedCondo = await prisma.condominio.update({
        where: { id: condo.id },
        data: condo,
      })

      return res.status(200).json(updatedCondo)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  static async exportCsv(req: Request, res: Response) {}
}
