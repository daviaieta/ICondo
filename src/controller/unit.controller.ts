import { Request, Response } from 'express'
import Unit from '../models/unit.models'

export class UnitController {
  static async listUnits(req: Request, res: Response) {
    try {
      const unit = await Unit.findAll()
      return res.status(200).json({
        sucess: true,
        data: unit,
      })
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
      await Unit.create(unit)

      return res.status(200).json({
        sucess: true,
        data: 'successfully created',
      })
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        error: error,
      })
    }
  }

  static async deleteUnit(req: Request, res: Response) {
    try {
      const unitID = req.body.id
      await Unit.destroy({
        where: { id_unidade: unitID },
      })
      return res.status(200).json({
        sucess: true,
        data: 'successfully deleted',
      })
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        error: error,
      })
    }
  }
}
