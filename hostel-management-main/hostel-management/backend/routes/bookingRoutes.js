import express from 'express';
import {
  createBooking,
  getStudentBooking,
  getAllBookings,
} from '../controllers/bookingController.js';

const router = express.Router();

router.route('/').post(createBooking).get(getAllBookings);
router.route('/:regNo').get(getStudentBooking);

export default router;
