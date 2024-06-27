import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import * as fastcsv from 'fast-csv'
import * as stream from 'stream'

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

  static async exportCsv(req: Request, res: Response) {
    try {
      const condos = await prisma.condominio.findMany({})

      const csvStream = fastcsv.format({ headers: true })
      const readStream = new stream.PassThrough()
      readStream.end(JSON.stringify(condos))

      res.setHeader('Content-Disposition', 'attachment; filename=condominios.csv')
      res.setHeader('Content-Type', 'text/csv')

      csvStream.pipe(res)
      condos.forEach((condo) => csvStream.write(condo))
      csvStream.end()
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error })
    }
  }
}
