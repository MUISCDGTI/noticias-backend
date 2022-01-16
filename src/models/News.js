var stringSimilarity = require("string-similarity");

var mongoose = require('mongoose');
var FilmsResource = require('../services/filmsResource')
var NotificationsResource = require('../services/notificationsResource')

var newsSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: String,
  text: {type: String, required: true},
  author: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  relatedMovies: {type: Array, default: []},
  tags: {type: Array, default: []},
  image: {type: String}
});

/**newsSchema.pre("save",function(next){
  FilmsResource.getAllFilmsProtected().then((film) => {
    const news = this;
    const relatedMovies = film.filter(f => stringSimilarity.compareTwoStrings(news.title.toLowerCase(), f.title.toLowerCase()) > 0.3)
    news.relatedMovies = relatedMovies.map((m) => {
      return m.title
    })
    next();
  })
});

newsSchema.post("save", function() {
  console.log(this._id.toString())
  NotificationsResource.notifyNotificationsServiceProtected(this._id.toString());
})
*/

const News = mongoose.model('News', newsSchema);

module.exports = News;