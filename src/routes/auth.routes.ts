import express from 'express'
import { AuthController } from '../controller/auth.controller'

const router = express.Router()

router.get('/finish-registration/:token', AuthController.finishRegistration)
router.post('/finish-registration/:token', AuthController.finishRegistration)

export default router