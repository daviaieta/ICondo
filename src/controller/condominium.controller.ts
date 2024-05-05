import { Request, Response } from 'express'
import Condominium from '../models/condominium.models'

export class CondominiumController {
  static async listCondominiums(req: Request, res: Response) {
    try {
      const condominium = await Condominium.findAll()
      return res.status(200).json({
        sucess: true,
        data: condominium,
      })
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        error: error,
      })
    }
  }

  static async createCondominium(req: Request, res: Response) {
    const condominium = req.body
    try {
      await Condominium.create(condominium)
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

  static async deleteCondominium(req: Request, res: Response) {
    let condominiumID = req.body.id
    try {
      await Condominium.destroy({
        where: { id_condominio: condominiumID },
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
