import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export class UnitController {
  static async listUnits(req: Request, res: Response) {
    try {
      const unit = await prisma.unit.findMany({})
      return res.status(200).json({ unit })
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        error: error,
      })
    }
  }

  static async createUnit(req: Request, res: Response) {
    try {
      const unit = req.body
      await prisma.unit.create(unit)

      return res.status(200).json({ unit })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  static async deleteUnit(req: Request, res: Response) {
    try {
      const unitId = req.body.id
      await prisma.unit.delete({
        where: unitId,
      })
      return res.status(200).json({})
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}
