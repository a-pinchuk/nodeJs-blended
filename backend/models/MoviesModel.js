const { model, Schema } = require('mongoose');
const moviesSchema = Schema({
  title: {
    type: String,
    required: [true, 'DB: Title is required'],
  },
  genre: {
    type: String,
    required: [true, 'DB: Genre is required'],
  },
  year: {
    type: Number,
    default: 2000,
  },
  rating: {
    type: Number,
    default: 0.0,
  },
});

module.exports = model('movies', moviesSchema);
