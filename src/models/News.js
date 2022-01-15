var mongoose = require('mongoose');

var newsSchema = new mongoose.Schema({
  title: {type: String, required: true},
  //description: String,
  text: {type: String, required: true},
  author: {type: String, required: true},
  //createdAt: {type: Date, default: Date.now},
  //relatedMovies: {type: Array, default: []},
  //tags: {type: Array, default: []},
  //image: {type: String}
});

module.exports = mongoose.model('News', newsSchema);