var stringSimilarity = require("string-similarity");

var mongoose = require('mongoose');
var FilmsResource = require('../services/filmsResource')
var NotificationsResource = require('../services/notificationsResource')

var newsSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: String,
  text: {type: String, required: true, min: 50},
  author: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  relatedMovies: {type: Array, default: []},
  tags: {type: Array, default: []},
  urlImagen: {type: String}
});

newsSchema.pre("save",function(next){
  FilmsResource.getAllFilmsProtected().then((film) => {
    const news = this;
    const relatedMovies = film.filter(f => stringSimilarity.compareTwoStrings(news.title.toLowerCase(), f.title.toLowerCase()) > 0.3)
    news.relatedMovies = relatedMovies.map((m) => {
      return m.title
    })
    next();
  })

  const tags = ["Action", "Comedy", "Horror", "Drama", "Fantasy", "Mistery", "Romance", "Thriller"];
  const shuffled = tags.sort(() => 0.5 - Math.random());
  this.tags = shuffled.slice(0,3);

});

newsSchema.post("save", function() {
  NotificationsResource.notifyNotificationsServiceProtected(this._id.toString());
})

const News = mongoose.model('News', newsSchema);

module.exports = News;