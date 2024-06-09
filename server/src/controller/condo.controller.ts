import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export class CondoController {
  static async list(req: Request, res: Response) {
    try {
      const condominium = await prisma.condo.findMany({})
      return res.status(200).json(condominium)
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  static async create(req: Request, res: Response) {
    const condominium = req.body
    try {
      await prisma.condo.create(condominium)
      return res.status(200).json({ condominium })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  static async delete(req: Request, res: Response) {
    const condominiumID = req.body.id
    try {
      await prisma.condo.delete({
        where: condominiumID,
      })
      return res.status(200).json({})
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}
