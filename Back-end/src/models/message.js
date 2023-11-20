const mongoose = require('mongoose');

const constants = require('../utils/constants');

const { Schema } = mongoose;

let messageSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    required: true,
  },
  parentMessageId: {
    type: Schema.Types.ObjectId,
    ref: 'Message'
  },
  discussionId: {
    type: Schema.Types.ObjectId,
    ref: 'Discussion'
  },
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
  isVisible: {
    type: Boolean,
    required: true,
    default: true
  },
  isFlagged: {
    type: Boolean,
  },
  moderators: [{
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'User'
  }],
  votes: {
    yes: [{
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'User'
    }],
    no: [{
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'User'
    }]
  }
},{ timestamps: true });


module.exports = mongoose.model('Message', messageSchema);
