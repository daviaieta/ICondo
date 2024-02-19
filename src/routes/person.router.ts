import express from 'express'
import { PersonController } from '../controller/person.controller'

const router = express.Router()

router.get('/', PersonController.listPeople)

export default router