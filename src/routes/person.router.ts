import express from 'express'
import { PersonController } from '../controller/person.controller'
import authenticate from '../middleware/authMiddleware'

const router = express.Router()
router.use(authenticate)

router.get('/', PersonController.listPeople)

router.get('/create', PersonController.createPerson)
router.post('/create', PersonController.createPerson)

export default router