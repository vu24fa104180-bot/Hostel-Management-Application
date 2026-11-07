import Complaint from '../models/Complaint.js';

// @desc    Create a complaint
// @route   POST /api/complaints
// @access  Private
const createComplaint = async (req, res, next) => {
  try {
    const { studentRegNo, title, description } = req.body;

    const complaint = await Complaint.create({
      studentRegNo,
      title,
      description,
      status: 'pending',
    });

    res.status(201).json(complaint);
  } catch (error) {
    next(error);
  }
};

// @desc    Get student complaints
// @route   GET /api/complaints/:regNo
// @access  Private
const getStudentComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find({ studentRegNo: req.params.regNo });
    res.json(complaints);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all complaints
// @route   GET /api/complaints
// @access  Private/Admin
const getAllComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find({});
    res.json(complaints);
  } catch (error) {
    next(error);
  }
};

// @desc    Update complaint status
// @route   PUT /api/complaints/:id
// @access  Private/Admin
const updateComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (complaint) {
      complaint.status = req.body.status || complaint.status;
      const updatedComplaint = await complaint.save();
      res.json(updatedComplaint);
    } else {
      res.status(404);
      throw new Error('Complaint not found');
    }
  } catch (error) {
    next(error);
  }
};

export { createComplaint, getStudentComplaints, getAllComplaints, updateComplaint };
