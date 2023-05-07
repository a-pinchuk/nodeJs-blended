const MoviesModel = require('../models/MoviesModel');

class MoviesServices {
  show = async () => {
    const movies = await MoviesModel.find({});
    if (!movies) {
      res.status(400);
      throw new Error('Unable to fetch movies');
    }
    return movies;
  };

  add = async data => {};
}

module.exports = new MoviesServices();
