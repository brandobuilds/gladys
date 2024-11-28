import mongoose from 'mongoose';
import type { Reminder } from '../../src/types';

const nagSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  days: [{
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  }],
  timeSlots: [{
    hours: [String],
    isRandom: Boolean,
    frequency: Number,
  }],
  recurrence: {
    type: String,
    enum: ['daily', 'today', 'tomorrow', 'workdays', 'weekends', 'custom'],
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  notifications: [{
    type: {
      type: String,
      enum: ['sms'],
      required: true,
    },
    value: String,
    enabled: Boolean,
    requireFollowUp: Boolean,
    followUpTimeout: Number,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

nagSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Nag = mongoose.model('Nag', nagSchema);