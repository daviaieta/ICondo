import { Request, Response } from 'express'
import Order from '../models/order.models'

export class OrderController {
  static async listOrders(req: Request, res: Response) {
    try {
      const ordes = await Order.findAll()
      return res.render('order/list', ordes)
    } catch (error) {
      return res.status(500).json({ error: error })
    }
  }
}
