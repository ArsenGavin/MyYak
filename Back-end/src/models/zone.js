const mongoose = require('mongoose');
const { Schema } = mongoose;

const zoneSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  topX: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  topY: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  bottomX: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  bottomY: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  discussions: [{
    type: Schema.Types.ObjectId,
    ref: 'Discussion'
  }]
},{
  timestamps: true
});

module.exports = mongoose.model('Zone', zoneSchema);
