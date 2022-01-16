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
        if (err) {
            console.log(Date() + " - " + err);
      
            if (err.errors) {
              res.status(400).send({ error: err.message })
            } else {
              res.sendStatus(500);
            }
        } else {
            res.status(200).json(news);
        }
    })
});

router.get('/:id',passport.authenticate('localapikey', {session:false}), (req, res) => {
    if (req.body) {
        News.findById(req.params.id, (err, news) => {
            if (news == null || err) {
                console.log(Date() + " - " + err);
          
                if (err.errors) {
                  res.status(400).send({ error: err.message })
                } else {
                  res.sendStatus(500);
                }
            } else {
                res.status(200).json(news);
            }
        });
    }
});

router.post('/', passport.authenticate('localapikey', {session:false}), (req, res) => {
    var news = req.body;
    News.create(news, (err) => {
        if (err) {
            console.log(Date() + " - " + err);
      
            if (err.errors) {
              res.status(400).send({ error: err.message })
            } else {
              res.sendStatus(500);
            }
          } else {
            res.sendStatus(201);
          }
    });
});

router.put('/:id', passport.authenticate('localapikey', {session:false}), (req, res) => {
    News.findByIdAndUpdate(req.params.id, req.body, { runValidators: true}, (err, news) => {
        if (err || news == null) {
            console.log(Date() + " - " + err);
      
            if (err.errors) {
              res.status(400).send({ error: err.message })
            } else {
              res.sendStatus(500);
            }
        } else {
            res.status(200).json(news);
        }
    });
});

router.delete('/:id', passport.authenticate('localapikey', {session:false}), (req, res) => {
    const id = req.params.id;

    News.findOneAndRemove({ _id: id }, (err, news) => {
        if (err || news == null) {
            console.log(Date() + " - " + err);
              res.sendStatus(500);
            
        } else {
            res.status(200).json(news);
        }
    });
});


module.exports = router;