var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tooLateComersSchema = new Schema({
  name: String,
  date: String,
  time: String
});

var TooLateComers = mongoose.model('toolatecomers', tooLateComersSchema);
module.exports = TooLateComers;