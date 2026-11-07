import express from 'express';
import {
  createComplaint,
  getStudentComplaints,
  getAllComplaints,
  updateComplaint,
} from '../controllers/complaintController.js';

const router = express.Router();

router.route('/').post(createComplaint).get(getAllComplaints);
router.route('/:regNo').get(getStudentComplaints);
router.route('/:id').put(updateComplaint);

export default router;
