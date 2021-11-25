var express = require('express');
var router = express.Router();
var News = require('../models/News.js')

router.param('_id', (req, res, next, _id) => {
    News.findOne({_id: _id}).then(function(news){
        if (!news) { return res.sendStatus(404); }
        req.news = news;
        return next();
    }).catch(next);
})

router.get('/:id', (req, res) => {
    if (req.body) {

        News.findById(req.body.id).then((news) => {

            if (!news) { return res.sendStatus(404);}
            return res.json({news: news})

        })
    }
});

router.get('/', (req, res) => {
    res.send('hola')
})

router.post('/', (req, res) => {
    
    News.create(req.body, function (err, news) {
        if (err) return next(err);
        res.json(news)
    });

});

module.exports = router;