import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export class UnitController {
  static async list(req: Request, res: Response) {
    try {
      const units = await prisma.unidade.findMany({})
      return res.send(units)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const unit = req.body
      const createdUnit = await prisma.unidade.create({
        data: unit,
      })

      return res.send(createdUnit)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const unit = req.body
      const updatedUnit = await prisma.unidade.update({
        where: { id: unit.id },
        data: unit,
      })

      return res.send(updatedUnit)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const unitId = req.body.id
      const deleteUnit = await prisma.unidade.delete({
        where: { id: unitId },
      })

      return res.send(deleteUnit)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}
