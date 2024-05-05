import express from 'express'
import { UnitController } from '../controller/unit.controller'
import authenticate from '../middleware/authMiddleware'

const router = express.Router()
// router.use(authenticate)

router.get('/', UnitController.listUnits)

router.post('/create', UnitController.createUnit)

router.post('/delete/:id', UnitController.deleteUnit)

export default router
