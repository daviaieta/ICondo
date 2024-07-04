import express from 'express'
import { UnitController } from '../controller/unit.controller'

const router = express.Router()

router.get('/', UnitController.list)
router.post('/create', UnitController.create)
router.post('/delete', UnitController.delete)

export default router
