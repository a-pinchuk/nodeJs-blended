const MoviesModel = require('../models/MoviesModel');
const asyncHandler = require('express-async-handler');
const { isValidObjectId } = require('mongoose');
const moviesServices = require('../services/MoviesServices');

class MoviesController {
  //   add = (req, res) => {
  //     const { genre, title } = req.body;
  //     if (!genre || !title) {
  //       res.status(400).json({ code: 400, massage: 'Please provide all required films' });
  //     }
  //   };

  //   add = asyncHandler(async (req, res) => {
  //     const { genre, title } = req.body;
  //     if (!genre || !title) {
  //       //   res.status(400).json({ code: 400, massage: 'Please provide all required films' });
  //       res.status(400);
  //       throw new Error('Please provide all required films');
  //     }
  //     const movie = await MoviesModel.create({ ...req.body });
  //     if (!movie) {
  //       res.status(400);
  //       throw new Error('Unable to save in DataBase');
  //     }
  //     res.status(201).json({ code: 201, data: movie });
  //   });
  add = asyncHandler(async (req, res) => {
    const { genre, title } = req.body;
    if (!genre || !title) {
      //   res.status(400).json({ code: 400, massage: 'Please provide all required films' });
      res.status(400);
      throw new Error('Please provide all required films');
    }
    const movie = await moviesServices.add({ ...req.body });
    if (!movie) {
      res.status(400);
      throw new Error('Unable to save in DataBase');
    }
    res.status(201).json({ code: 201, data: movie });
  });

  //   getAll = asyncHandler(async (req, res) => {
  //     // const movies = await MoviesModel.find({});
  //     // if (!movies) {
  //     //   res.status(400);
  //     //   throw new Error('Unable to fetch movies');
  //     // }
  //     // res.status(200).json({ code: 200, data: movies, qty: movies.length });

  //   });

  getAll = asyncHandler(async (req, res) => {
    const movies = await moviesServices.show();
    res.status(200).json({ code: 200, data: movies, qty: movies.length });
  });

  getOne = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      res.status(400);
      throw new Error('Not valid ID');
    }
    const movie = await MoviesModel.findById(id);

    if (!movie) {
      res.status(400);
      throw new Error('Unable to find movie');
    }

    res.status(200).json({ code: 200, data: movie });
  });

  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      res.status(400);
      throw new Error('Not valid ID');
    }
    const movie = await MoviesModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!movie) {
      res.status(400);
      throw new Error('Unable to find movie');
    }
    res.status(200).json({ code: 200, data: movie });
  });

  remove = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      res.status(400);
      throw new Error('Not valid ID');
    }
    const movie = await MoviesModel.findByIdAndDelete(id);
    if (!movie) {
      res.status(400);
      throw new Error('Unable to find movie');
    }
    res.status(200).json({ code: 200, data: movie });
  });
}

module.exports = new MoviesController();
