import express from 'express'
// const { signupController, loginController } = require('../controllers/AuthControllers')
import { signupController, loginController } from '../controllers/AuthControllers.js'

const authRoutes = express.Router()

authRoutes.post('/signup', signupController)
authRoutes.post('/login', loginController)

export default authRoutes