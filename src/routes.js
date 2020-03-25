const express = require('express');
const router = express.Router();

// Controllers
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');

router.get('/ongs', OngController.index);
router.post('/ongs', OngController.create);

router.post('/incidents', IncidentController.create);
router.get('/incidents', IncidentController.index);
router.delete('/incidents/:id', IncidentController.delete);

module.exports = router;