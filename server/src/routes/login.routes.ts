import express from 'express'
import { AuthController } from '../controller/auth.controller'

const router = express.Router()

router.post('/', AuthController.login)

export default router
