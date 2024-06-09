import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export class OrderController {
  static async listOrders(req: Request, res: Response) {
    try {
      const ordes = await prisma.order.findMany({})
      return res.status(200).json(ordes)
    } catch (error) {
      return res.status(400).json({ error: error })
    }
  }
}
