const express = require('express')
const { getUsersController, updateUsersController } = require('../controllers/UsersControllers')

const usersRoutes = express.Router()

usersRoutes.get('/', getUsersController)
// usersRoutes.post('/users', addUserController)
usersRoutes.put('/', updateUsersController)
// usersRoutes.delete('/users', deleteUserController)

module.exports = usersRoutes