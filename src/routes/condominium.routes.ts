import express from 'express'
import { CondominiumController } from '../controller/condominium.controller'
import authenticate from '../middleware/authMiddleware'

const router = express.Router()
router.use(authenticate)

router.get('/', CondominiumController.listCondominiums)

router.get('/create', CondominiumController.createCondominium)
router.post('/create', CondominiumController.createCondominium)

router.get('/delete/:id', CondominiumController.deleteCondominium)
router.post('/delete/:id', CondominiumController.deleteCondominium)


export default router