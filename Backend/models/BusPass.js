const mongoose = require('mongoose');

const busPassSchema = new mongoose.Schema({
  // User Information
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },

  // Contact Information
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },

  // Bus Details
  routeNumber: {
    type: String,
    required: true
  },
  boardingPoint: {
    type: String,
    required: true
  },
  passDuration: {
    type: Number,
    required: true
  },

  // Photo
  photoUrl: {
    type: String,
    required: true
  },

  // Payment Details
  amount: {
    type: Number,
    required: true
  },
  paymentId: {
    type: String
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },

  // Application Status
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
    default: 'pending'
  },

  // Validity
  validFrom: {
    type: Date
  },
  validUntil: {
    type: Date
  },

  // Approval Details
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvalDate: {
    type: Date
  },
  rejectionReason: {
    type: String
  },

  // Timestamps
  applicationDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
busPassSchema.index({ rollNumber: 1 });
busPassSchema.index({ status: 1 });
busPassSchema.index({ validUntil: 1 });
busPassSchema.index({ userId: 1 });

module.exports = mongoose.model('BusPass', busPassSchema); 