// http://localhost:62000/api/v1/movies
const moviesRoutes = require('express').Router();
const moviesController = require('../controllers/MoviesController');
const rolesMiddleware = require('../middleware/rolesMiddleware');

//Додати ФІЛЬМ в базу
moviesRoutes.post(
  '/movies',
  (req, res, next) => {
    console.log('Спрацював Joi');
    next();
  },
  moviesController.add
);
//Отримати всі фільми
moviesRoutes.get('/movies', rolesMiddleware(['ADMIN', 'MODERATOR']), moviesController.getAll);
//Отримати один фільм
moviesRoutes.get('/movies/:id', moviesController.getOne);
//Обновити фільм
moviesRoutes.put('/movies/:id', moviesController.update);
//Удалити фільм
moviesRoutes.delete('/movies/:id', moviesController.remove);

module.exports = moviesRoutes;
