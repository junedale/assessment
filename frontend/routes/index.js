var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController');

router.get('/', indexController.getIndex);
router.post('/', indexController.postIndex);



module.exports = router;
