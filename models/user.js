const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  firstName: { type: String, required: true, maxLength: 100 },
  lastName: { type: String, required: true, maxLength: 100 },
  username: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, maxLength: 100 },
  role: {
    type: String,
    enum: ['admin', 'member', 'visitor'],
    default: 'visitor',
    required: true,
  },
});

const User = mongoose.model('User', schema);

module.exports = User;
