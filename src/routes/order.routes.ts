import express from 'express'
import { OrderController } from '../controller/order.controller'
import authenticate from '../middleware/authMiddleware'

const router = express.Router()
router.use(authenticate)

router.get('/', OrderController.listOrders)

export default router