const express = require('express');
const router = express.Router();
const BusPass = require('../models/BusPass');
const auth = require('../middleware/auth');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const adminAuth = require('../middleware/adminAuth');
const { createOrder, verifyPayment } = require('../services/razorpayService');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: 'uploads/photos/',
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
    }
  },
});

// Check existing pass
router.get('/check/:rollNumber', auth, async (req, res) => {
  try {
    const existingPass = await BusPass.findOne({
      rollNumber: req.params.rollNumber,
      status: { $in: ['pending', 'approved'] },
      validUntil: { $gt: new Date() }
    });

    res.json({ hasPass: !!existingPass });
  } catch (error) {
    console.error('Error checking existing pass:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Submit new application
router.post('/apply', auth, upload.single('photo'), async (req, res) => {
  try {
    const {
      name, rollNumber, department, year,
      email, phone, address, city, pincode,
      routeNumber, boardingPoint, passDuration
    } = req.body;

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'Photo is required' });
    }

    // Calculate amount based on duration
    const prices = {
      '1': 3500,
      '3': 10000,
      '6': 17500,
      '12': 35000
    };

    const amount = prices[passDuration];

    // Create new application
    const busPass = new BusPass({
      userId: req.user._id,
      name,
      rollNumber,
      department,
      year,
      email,
      phone,
      address,
      city,
      pincode,
      routeNumber,
      boardingPoint,
      passDuration,
      photoUrl: `/uploads/photos/${req.file.filename}`,
      amount,
      status: 'pending',
      applicationDate: new Date()
    });

    await busPass.save();

    res.json({
      success: true,
      applicationId: busPass._id
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// Create payment order
router.post('/create-payment', auth, async (req, res) => {
  try {
    const { applicationId, amount } = req.body;

    const order = await createOrder(amount);

    // Update application with order ID
    await BusPass.findByIdAndUpdate(applicationId, {
      paymentOrderId: order.id
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error('Payment order creation error:', error);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
});

// Verify payment
router.post('/verify-payment', auth, async (req, res) => {
  try {
    const { orderId, paymentId, signature, applicationId } = req.body;

    const isValid = await verifyPayment(orderId, paymentId, signature);

    if (!isValid) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    // Update application with payment details
    await BusPass.findByIdAndUpdate(applicationId, {
      paymentId,
      paymentStatus: 'completed',
      paymentDate: new Date()
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

// Cancel application
router.post('/cancel/:id', auth, async (req, res) => {
  try {
    await BusPass.findByIdAndUpdate(req.params.id, {
      status: 'cancelled'
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Application cancellation error:', error);
    res.status(500).json({ error: 'Failed to cancel application' });
  }
});

// Admin routes

// Get pending applications
router.get('/admin/pending', adminAuth, async (req, res) => {
  try {
    const applications = await BusPass.find({
      status: 'pending',
      paymentStatus: 'completed'
    }).sort('-applicationDate');

    res.json(applications);
  } catch (error) {
    console.error('Error fetching pending applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Approve application
router.post('/admin/approve/:id', adminAuth, async (req, res) => {
  try {
    const busPass = await BusPass.findById(req.params.id);
    
    if (!busPass) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const validFrom = new Date();
    const validUntil = new Date();
    validUntil.setMonth(validUntil.getMonth() + parseInt(busPass.passDuration));

    busPass.status = 'approved';
    busPass.approvedBy = req.user._id;
    busPass.approvalDate = new Date();
    busPass.validFrom = validFrom;
    busPass.validUntil = validUntil;

    await busPass.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Error approving application:', error);
    res.status(500).json({ error: 'Failed to approve application' });
  }
});

// Reject application
router.post('/admin/reject/:id', adminAuth, async (req, res) => {
  try {
    const { reason } = req.body;

    await BusPass.findByIdAndUpdate(req.params.id, {
      status: 'rejected',
      rejectionReason: reason,
      approvedBy: req.user._id,
      approvalDate: new Date()
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error rejecting application:', error);
    res.status(500).json({ error: 'Failed to reject application' });
  }
});

// Get user's applications
router.get('/my-applications', auth, async (req, res) => {
  try {
    const applications = await BusPass.find({
      userId: req.user._id
    }).sort('-applicationDate');

    res.json(applications);
  } catch (error) {
    console.error('Error fetching user applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

module.exports = router; 