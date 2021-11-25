var express = require('express');
var router = express.Router();
var News = require('../models/News.js')

router.use(function timeLog(req, res, next) {
    console.log('REQUEST /news', Date());
    next();
});

router.get('/', (req, res) => {
    News.find((err, news) => {
        if (err) { return res.sendStatus(404); }
        res.json(news);
    });
});

router.get('/:id', (req, res) => {
    if (req.body) {
        News.findById(req.params.id).then((news) => {
            if (!news) { return res.sendStatus(404); }
            return res.json({ news: news })
        })
    }
});

router.post('/', (req, res) => {
    News.create(req.body, function (err, news) {
        if (err) return next(err);
        res.json(news)
    });
});

router.put('/:id', (req, res) => {
    News.findByIdAndUpdate(req.params.id, (err, news) => {
        if (err) { return res.sendStatus(404); }
        res.json(news);
    });
});

router.delete('/:id', (req, res) => {
    News.findByIdAndRemove(req.params.id, (err, news) => {
        if (err) { return res.sendStatus(404); }
        res.json(news);
    });
});


module.exports = router;