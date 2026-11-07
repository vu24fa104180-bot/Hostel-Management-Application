import Room from '../models/Room.js';
import Bed from '../models/Bed.js';

// @desc    Get all rooms with available beds count
// @route   GET /api/rooms
// @access  Public
const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find({});
    
    // We need to calculate available beds for each room
    const roomsWithBeds = await Promise.all(
      rooms.map(async (room) => {
        const availableBedsCount = await Bed.countDocuments({
          roomNumber: room.roomNumber,
          isAvailable: true,
        });
        
        return {
          ...room._doc,
          availableBeds: availableBedsCount,
        };
      })
    );

    res.json(roomsWithBeds);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single room by roomNumber
// @route   GET /api/rooms/:roomNumber
// @access  Public
const getRoomByNumber = async (req, res, next) => {
  try {
    const room = await Room.findOne({ roomNumber: req.params.roomNumber });
    
    if (room) {
      const beds = await Bed.find({ roomNumber: room.roomNumber });
      const availableBedsCount = beds.filter(b => b.isAvailable).length;

      res.json({
        ...room._doc,
        availableBeds: availableBedsCount,
        beds
      });
    } else {
      res.status(404);
      throw new Error('Room not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a room
// @route   POST /api/rooms
// @access  Private/Admin
const createRoom = async (req, res, next) => {
  try {
    const { roomNumber, floorNumber, sharing } = req.body;

    const roomExists = await Room.findOne({ roomNumber });
    if (roomExists) {
      res.status(400);
      throw new Error('Room already exists');
    }

    const room = await Room.create({
      roomNumber,
      floorNumber,
      sharing,
    });

    // Create beds automatically based on sharing number
    for (let i = 1; i <= sharing; i++) {
      await Bed.create({
        bedNumber: i,
        roomNumber: room.roomNumber,
        isAvailable: true,
      });
    }

    res.status(201).json(room);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a room
// @route   PUT /api/rooms/:id
// @access  Private/Admin
const updateRoom = async (req, res, next) => {
  try {
    const { roomNumber, floorNumber, sharing } = req.body;
    const room = await Room.findById(req.params.id);

    if (room) {
      room.roomNumber = roomNumber || room.roomNumber;
      room.floorNumber = floorNumber || room.floorNumber;
      // We aren't dynamically creating/deleting beds if sharing changes for simplicity in this implementation
      room.sharing = sharing || room.sharing;

      const updatedRoom = await room.save();
      res.json(updatedRoom);
    } else {
      res.status(404);
      throw new Error('Room not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a room
// @route   DELETE /api/rooms/:id
// @access  Private/Admin
const deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    if (room) {
      // Delete associated beds
      await Bed.deleteMany({ roomNumber: room.roomNumber });
      await Room.deleteOne({ _id: room._id });
      res.json({ message: 'Room removed' });
    } else {
      res.status(404);
      throw new Error('Room not found');
    }
  } catch (error) {
    next(error);
  }
};

export { getRooms, getRoomByNumber, createRoom, updateRoom, deleteRoom };
