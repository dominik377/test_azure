const mongoose = require('mongoose');

const simpleObjectSchema = new mongoose.Schema({
  a: Number,
  b: Number,
  c: Number,
});

module.exports = mongoose.model('SimpleObject', simpleObjectSchema);
