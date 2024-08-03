import express from 'express'
import { AuthController } from '../controller/auth.controller'

const router = express.Router()

router.post('/', AuthController.auth)

router.post('/finish-registration/:token', AuthController.finishRegistration)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.get('/profile', AuthController.showProfile)

export default router
