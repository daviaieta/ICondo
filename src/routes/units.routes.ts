import express from 'express'
import { UnitController } from '../controller/unit.controller'

const router = express.Router()

router.get('/', UnitController.listUnits)

router.get('/new', UnitController.createUnit)
router.post('/new', UnitController.createUnit)

router.get('/delete/:id', UnitController.deleteUnit)
router.post('/delete/:id', UnitController.deleteUnit)

export default router