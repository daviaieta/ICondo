import express from 'express'
import { CondominiumController } from '../controller/condominium.controller'
import authenticate from '../middleware/authMiddleware'

const router = express.Router()
// router.use(authenticate)

router.get('/', CondominiumController.listCondominiums)

router.post('/create', CondominiumController.createCondominium)

router.post('/delete/', CondominiumController.deleteCondominium)

export default router
