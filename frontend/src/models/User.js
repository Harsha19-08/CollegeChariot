const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    sparse: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  picture: {
    type: String
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'superadmin'],
    default: 'student'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  studentDetails: {
    rollNumber: {
      type: String,
      sparse: true,
      trim: true
    },
    branch: {
      type: String,
      enum: ['IT', 'CSE', 'CSIT', 'CSE(AIML)', 'CSE(DS)', 'ECE', 'EEE', 'Aero', 'Mechanical', 'MBA', 'BBA', 'M.Tech']
    },
    year: {
      type: Number,
      min: 1,
      max: 4
    }
  },
  phoneNumber: {
    type: String,
    match: /^[0-9]{10}$/,
    sparse: true
  },
  notifications: [{
    type: {
      type: String,
      enum: ['pass_status', 'payment', 'renewal', 'admin', 'system'],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    read: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  lastLogin: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  passwordResetToken: String,
  passwordResetExpires: Date
}, {
  timestamps: true
});

// Add indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ role: 1 });
userSchema.index({ 'studentDetails.rollNumber': 1 });

// Instance method to add a notification
userSchema.methods.addNotification = function(type, title, message) {
  this.notifications.unshift({
    type,
    title,
    message
  });
  return this.save();
};

// Static method to find admin users
userSchema.statics.findAdmins = function() {
  return this.find({ role: { $in: ['admin', 'superadmin'] } });
};

const User = mongoose.model('User', userSchema);

module.exports = User; 