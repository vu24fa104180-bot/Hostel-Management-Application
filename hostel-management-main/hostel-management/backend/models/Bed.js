import mongoose from 'mongoose';

const bedSchema = mongoose.Schema(
  {
    bedNumber: {
      type: Number,
      required: true,
    },
    roomNumber: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bed = mongoose.model('Bed', bedSchema);
export default Bed;
