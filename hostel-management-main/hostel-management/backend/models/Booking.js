import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema(
  {
    studentRegNo: {
      type: String,
      required: true,
    },
    roomNumber: {
      type: Number,
      required: true,
    },
    bedNumber: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'pending'],
      default: 'paid', // per requirements
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
