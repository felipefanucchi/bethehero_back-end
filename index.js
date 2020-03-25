const express = require('express');
const app = express();

app.use(express.json());

app.post('/users/:id', (request, response) => {
  return response.json({
    params: request.params.id,
    query: {
      ...request.query,
    },
    body: {
      ...request.body
    }
  });
})

app.listen(3333);