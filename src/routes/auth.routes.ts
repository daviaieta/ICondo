import express from 'express'
import { AuthController } from '../controller/auth.controller'

const router = express.Router()

router.get('/finish-registration/:token', AuthController.finishRegistration)
router.post('/finish-registration/:token', AuthController.finishRegistration)

router.get('/login', AuthController.login)
router.post('/login', AuthController.login)

router.get('/logout', AuthController.logout)
router.post('/logout', AuthController.logout)

export default router