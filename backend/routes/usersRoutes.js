const usersRoutes = require('express').Router();
const usersController = require('../controllers/UsersController');

usersRoutes.patch('/users/:id', usersController.updateRoles);

module.exports = usersRoutes;
