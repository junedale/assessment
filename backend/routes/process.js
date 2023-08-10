const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const processController = require('../controllers/processController');

router.post('/original', [
    body('anytext').isURL().withMessage('Please enter a valid URL')
], processController.postOriginal);



module.exports = router;