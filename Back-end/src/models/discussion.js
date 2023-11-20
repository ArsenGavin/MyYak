const mongoose = require('mongoose');
const { Schema } = mongoose;

const discussionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  zoneId: {
    type: Schema.Types.ObjectId,
    ref: 'Zone'
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }],
  ups: [{
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'User'
  }],
  downs: [{
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'User'
  }],
}, {
  timestamps: true
});

module.exports = mongoose.model('Discussion', discussionSchema);
