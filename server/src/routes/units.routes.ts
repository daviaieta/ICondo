import express from 'express'
import { UnitController } from '../controller/unit.controller'

const router = express.Router()

router.get('/', UnitController.listUnits)

router.post('/create', UnitController.createUnit)

router.post('/delete/:id', UnitController.deleteUnit)

export default router
