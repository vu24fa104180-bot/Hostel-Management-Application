import express from 'express';
import {
  createPayment,
  getStudentPayments,
  getAllPayments,
} from '../controllers/paymentController.js';

const router = express.Router();

router.route('/').post(createPayment).get(getAllPayments);
router.route('/:regNo').get(getStudentPayments);

export default router;
