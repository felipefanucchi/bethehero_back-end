const express = require('express');
const router = express.Router();

// Controllers
const OngController = require('./controllers/OngController');

router.get('/ongs', OngController.index);
router.post('/ongs', OngController.create);

module.exports = router;