const express = require('express');
const crypto = require('crypto');
const connection = require('./database/connection');

const router = express.Router();

router.post('/ongs', async (request, response) => {
  const {name, email, whatsapp, city, uf} = request.body;
  const id = crypto.randomBytes(4).toString('HEX');

  await connection('ongs').insert({
    id,
    name,
    email,
    whatsapp,
    city,
    uf,
  });

  return response.json({ id });
});

module.exports = router;