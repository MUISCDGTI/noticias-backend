var express = require('express');
var router = express.Router();
var News = require('../models/News.js')

router.use(function timeLog(req, res, next) {
    console.log('REQUEST /news', Date());
    next();
});

router.get('/', (req, res) => {
    News.find(req.query, (err, news) => {
        if (err) { return res.sendStatus(404); }
        res.status(200).json(news);
    });
});

router.get('/:id', (req, res) => {
    if (req.body) {
        News.findById(req.params.id).then((news) => {
            if (news == null) { return res.sendStatus(404); }
            res.status(200).json({ news: news })
        })
    }
});

router.post('/', (req, res) => {
    News.create(req.body, function (err, news) {
        if (err) return res.sendStatus(400);
        res.status(201).json(news)
    });
});

router.put('/:id', (req, res) => {
    News.findByIdAndUpdate(req.params.id, req.body, (err, news) => {
        if (err || news == null) { return res.sendStatus(404); }
        res.status(200).json(news);
    });
});

router.delete('/:id', (req, res) => {
    News.findByIdAndRemove(req.params.id, (err, news) => {
        if (err || news == null) { return res.sendStatus(404); }
        res.status(200).json(news); 
    });
});


module.exports = router;