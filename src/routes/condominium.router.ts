import express from 'express'
import { CondominiumController } from '../controller/condominium.controller'

const router = express.Router()

router.get('/', CondominiumController.listCondominium)

router.get('/new', CondominiumController.createCondominium)
router.post('/new', CondominiumController.createCondominium)


export default router