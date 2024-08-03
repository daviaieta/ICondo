import express from 'express'
import { PersonController } from '../controller/user.controller'

const router = express.Router()

router.get('/', PersonController.listPeople)
router.post('/create', PersonController.createPerson)

export default router
