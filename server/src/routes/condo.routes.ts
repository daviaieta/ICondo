import express from 'express'
import { CondoController } from '../controller/condo.controller'

const router = express.Router()

router.get('/', CondoController.list)
router.post('/create', CondoController.create)
router.post('/delete', CondoController.delete)
router.post('/update', CondoController.update)
router.get('/export-csv', CondoController.exportCsv)

export default router
