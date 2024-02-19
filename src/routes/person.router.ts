import express from 'express'
import { PersonController } from '../controller/person.controller'

const router = express.Router()

router.get('/', PersonController.listPeople)

router.get('/create', PersonController.createPerson)
router.post('/create', PersonController.createPerson)

export default router