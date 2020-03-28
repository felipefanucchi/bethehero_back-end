const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');

app.use(cors({
  origin: 'https://xenodochial-kepler-fb6a74.netlify.com'
}));
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);