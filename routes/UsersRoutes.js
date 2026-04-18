import express from 'express'
import { getUsersController, updateUsersController } from '../controllers/UsersControllers.js'

const usersRoutes = express.Router()

usersRoutes.get('/', getUsersController)
// usersRoutes.post('/users', addUserController)
usersRoutes.put('/', updateUsersController)
// usersRoutes.delete('/users', deleteUserController)

export default usersRoutes