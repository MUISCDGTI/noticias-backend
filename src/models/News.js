var mongoose = require('mongoose');

var newsSchema = new mongoose.Schema({
  _id: {type:String, required: true},
  newsTitle: String,
  newsText: String,
  newsAuthor: String,
  newsDate: Date
});

module.exports = mongoose.model('News', newsSchema);