import mongoose from 'mongoose';

const roomSchema = mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    floorNumber: {
      type: Number,
      required: true,
    },
    sharing: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model('Room', roomSchema);
export default Room;
