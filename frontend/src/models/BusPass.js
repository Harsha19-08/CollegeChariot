const mongoose = require('mongoose');

const busPassSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serialNumber: {
    type: String,
    unique: true,
    required: true
  },
  personalDetails: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    branch: {
      type: String,
      required: true,
      enum: ['IT', 'CSE', 'CSIT', 'CSE(AIML)', 'CSE(DS)', 'ECE', 'EEE', 'Aero', 'Mechanical', 'MBA', 'BBA', 'M.Tech']
    },
    year: {
      type: Number,
      required: true,
      min: 1,
      max: 4
    },
    bloodGroup: {
      type: String,
      required: true
    },
    fatherName: {
      type: String,
      required: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/
    },
    email: {
      type: String,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
  },
  address: {
    present: {
      type: String,
      required: true
    },
    permanent: {
      type: String,
      required: true
    }
  },
  busDetails: {
    routeNumber: {
      type: String,
      required: true
    },
    boardingPoint: {
      type: String,
      required: true
    },
    passDuration: {
      type: String,
      required: true,
      enum: ['halfSemester', 'oneSemester', 'twoSemesters']
    }
  },
  payment: {
    receiptNumber: {
      type: String,
      required: true,
      unique: true
    },
    amount: {
      type: Number,
      required: true
    },
    stripePaymentId: {
      type: String,
      required: true
    },
    paidAt: {
      type: Date,
      default: Date.now
    }
  },
  status: {
    type: String,
    required: true,
    enum: ['submitted', 'waitingForVerification', 'paymentPending', 'paid', 'approved', 'rejected', 'issued'],
    default: 'submitted'
  },
  photo: {
    url: {
      type: String,
      required: true
    },
    publicId: String
  },
  isRenewal: {
    type: Boolean,
    default: false
  },
  previousPassNumber: {
    type: String,
    sparse: true
  },
  validFrom: {
    type: Date,
    required: true
  },
  validUntil: {
    type: Date,
    required: true
  },
  adminRemarks: {
    type: String
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Generate serial number before saving
busPassSchema.pre('save', async function(next) {
  if (this.isNew) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const count = await this.constructor.countDocuments();
    this.serialNumber = `BP${year}${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

// Add indexes for better query performance
busPassSchema.index({ userId: 1, status: 1 });
busPassSchema.index({ 'personalDetails.rollNumber': 1 });
busPassSchema.index({ serialNumber: 1 });

const BusPass = mongoose.model('BusPass', busPassSchema);

module.exports = BusPass; 