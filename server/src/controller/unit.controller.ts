import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export class UnitController {
  static async listUnits(req: Request, res: Response) {
    try {
      const units = await prisma.unidade.findMany({})
      return res.status(200).json(units)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  static async createUnit(req: Request, res: Response) {
    try {
      const unit = req.body
      await prisma.unidade.create({
        data: {
          ...unit,
          Condominio: {
            connect: {
              id: unit.condominio,
            },
          },
        },
      })

      return res.status(200).json({ unit })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error })
    }
  }

  static async deleteUnit(req: Request, res: Response) {
    try {
      const unitId = req.body.id
      await prisma.unidade.delete({
        where: unitId,
      })
      return res.status(200).json({})
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}
