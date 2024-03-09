import express from 'express'
import { AuthController } from '../controller/auth.controller'

const router = express.Router()

router.get('/finishRegistration/:token', AuthController.finishRegistration)
router.post('/finishRegistration/:token', AuthController.finishRegistration)

export default router