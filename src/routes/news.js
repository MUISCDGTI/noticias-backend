var express = require('express');
var router = express.Router();
var News = require('../models/News.js')
require('../passport.js');
const passport = require('passport');

router.use(function timeLog(req, res, next) {
    console.log('REQUEST /news', Date());
    next();
});

router.get('/', passport.authenticate('localapikey', {session:false}), (req, res) => {
    News.find(req.query, (err, news) => {
        if (err) { return res.sendStatus(404); }
        res.status(200).json(news);
    })
});

router.get('/:id',passport.authenticate('localapikey', {session:false}), (req, res) => {
    if (req.body) {
        News.findById(req.params.id, (err, news) => {
            if (news == null || err) { return res.sendStatus(404); }
            res.status(200).json(news);
        });
    }
});

router.post('/', passport.authenticate('localapikey', {session:false}), (req, res) => {
    var news = req.body;
    News.create(news, (err) => {
        if (err) return res.sendStatus(500);
        res.status(201);
    });
});

router.put('/:id', passport.authenticate('localapikey', {session:false}), (req, res) => {
    News.findByIdAndUpdate(req.params.id, req.body, (err, news) => {
        if (err || news == null) { return res.sendStatus(404); }
        res.status(200).json(news);
    });
});

router.delete('/:id', passport.authenticate('localapikey', {session:false}), (req, res) => {
    News.findByIdAndRemove(req.params.id, (err, news) => {
        if (err || news == null) { return res.sendStatus(404); }
        res.status(200).json(news);
    });
});


module.exports = router;