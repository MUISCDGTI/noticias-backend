var express = require('express');
var router = express.Router();

router.get('/health', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;