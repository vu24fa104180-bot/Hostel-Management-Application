import express from 'express';
import {
  getRooms,
  getRoomByNumber,
  createRoom,
  updateRoom,
  deleteRoom,
} from '../controllers/roomController.js';

const router = express.Router();

router.route('/').get(getRooms).post(createRoom);
router.route('/:roomNumber').get(getRoomByNumber);
router.route('/:id').put(updateRoom).delete(deleteRoom);

export default router;
