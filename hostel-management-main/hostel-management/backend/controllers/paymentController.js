import Payment from '../models/Payment.js';

// @desc    Create a payment (Simulation)
// @route   POST /api/payments
// @access  Private
const createPayment = async (req, res, next) => {
  try {
    const { studentRegNo, amount } = req.body;

    // Simulate payment processing...
    const payment = await Payment.create({
      studentRegNo,
      amount,
      status: 'success',
    });

    res.status(201).json({
      success: true,
      payment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get student payments
// @route   GET /api/payments/:regNo
// @access  Private
const getStudentPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({ studentRegNo: req.params.regNo });
    res.json(payments);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all payments
// @route   GET /api/payments
// @access  Private/Admin
const getAllPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({});
    res.json(payments);
  } catch (error) {
    next(error);
  }
};

export { createPayment, getStudentPayments, getAllPayments };
