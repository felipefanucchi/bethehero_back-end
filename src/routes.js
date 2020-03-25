const express = require('express');
const router = express.Router();

router.post('/users/:id', (request, response) => {
  return response.json({
    params: request.params.id,
    query: {
    ...request.query,
    },
    body: {
    ...request.body
    }
  });
});

module.exports = router;