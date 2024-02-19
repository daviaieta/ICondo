import express from 'express'
import { CondominiumController } from '../controller/condominium.controller'

const router = express.Router()

router.get('/', CondominiumController.listCondominiums)


router.get('/create', CondominiumController.createCondominium)
router.post('/create', CondominiumController.createCondominium)


router.get('/delete/:id', CondominiumController.deleteCondominium)
router.post('/delete/:id', CondominiumController.deleteCondominium)


export default router