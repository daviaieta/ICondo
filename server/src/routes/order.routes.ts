import express from 'express'
import { OrderController } from '../controller/order.controller'

const router = express.Router()

router.get('/', OrderController.listOrders)

export default router
