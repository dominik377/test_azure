const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


// simple ping - pong
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.listen(3001, () => console.log('Server running on port 3001'));
