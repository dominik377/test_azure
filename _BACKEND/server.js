const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const SimpleObject = require('./models/simpleObject.ts'); // Mongoose model for SimpleObject


const app = express();

app.use(bodyParser.json());

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

const PORT = 3001;


mongoose.connect('mongodb://localhost:27017/simpleobjects', { useNewUrlParser: true });

app.post('/api/objects', async (req, res) => {
  const object = new SimpleObject(req.body);
  await object.save();
  res.status(201).send();
});

app.get('/api/objects', async (req, res) => {
  const objects = await SimpleObject.find();
  res.send(objects);
});

app.put('/api/objects/:id', async (req, res) => {
  await SimpleObject.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).send();
});

app.delete('/api/objects/:id', async (req, res) => {
  await SimpleObject.findByIdAndDelete(req.params.id);
  res.status(200).send();
});

app.get('/api/objects/:id', async (req, res) => {
  const object = await SimpleObject.findById(req.params.id);
  res.send(object);
});

// simple ping - pong
app.get('/api/ping', (req, res) => {
  res.send('pong');
});

app.listen(PORT, () => console.log('Server running on port ' + PORT));
