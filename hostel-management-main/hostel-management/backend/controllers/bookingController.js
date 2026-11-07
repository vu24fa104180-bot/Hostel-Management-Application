import Booking from '../models/Booking.js';
import Bed from '../models/Bed.js';
import Room from '../models/Room.js';

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res, next) => {
  try {
    const { studentRegNo, roomNumber, bedNumber } = req.body;

    // 1. Check if bed is available
    const bed = await Bed.findOne({ roomNumber, bedNumber });
    
    if (!bed) {
      res.status(404);
      throw new Error('Bed not found in the specified room');
    }

    if (!bed.isAvailable) {
      res.status(400);
      throw new Error('Bed is not available');
    }

    // Check if student already has an active booking
    const existingBooking = await Booking.findOne({ studentRegNo });
    if (existingBooking) {
      res.status(400);
      throw new Error('Student already has a booked room');
    }

    // 3. If available: Mark bed isAvailable = false
    bed.isAvailable = false;
    await bed.save();

    // Create booking
    const booking = await Booking.create({
      studentRegNo,
      roomNumber,
      bedNumber,
      paymentStatus: 'paid', // per requirements
    });

    res.status(201).json({
      success: true,
      booking
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get student booking details
// @route   GET /api/bookings/:regNo
// @access  Private
const getStudentBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ studentRegNo: req.params.regNo });

    if (booking) {
      // Also fetch the room details to send back full context
      const room = await Room.findOne({ roomNumber: booking.roomNumber });
      
      res.json({
        ...booking._doc,
        room
      });
    } else {
      res.status(404);
      throw new Error('Booking not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({});
    
    // Add user and room details if needed
    // In a real scenario we'd use populate(), but here RegNo is string reference
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

export { createBooking, getStudentBooking, getAllBookings };
