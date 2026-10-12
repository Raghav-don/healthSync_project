// user-service/controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// POST /api/users/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, gender, dob } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required.' });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }

    const newUser = new User({ name, email, password, role: role || 'patient', phone, gender, dob });
    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: newUser.toJSON(),
    });
  } catch (err) {
    console.error('[Register Error]', err.message);
    res.status(500).json({ message: 'Registration failed. Please try again.', error: err.message });
  }
};

// POST /api/users/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(user);
    res.json({
      message: 'Login successful',
      token,
      user: user.toJSON(),
    });
  } catch (err) {
    console.error('[Login Error]', err.message);
    res.status(500).json({ message: 'Login failed. Please try again.', error: err.message });
  }
};

// GET /api/users/profile  (requires auth)
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({ user: user.toJSON() });
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch profile.', error: err.message });
  }
};

// PUT /api/users/profile  (requires auth)
const updateProfile = async (req, res) => {
  try {
    const allowedFields = ['name', 'phone', 'dob', 'gender', 'bloodGroup', 'address', 'avatar'];
    const updates = {};
    allowedFields.forEach((f) => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

    const user = await User.findByIdAndUpdate(req.user.userId, updates, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({ message: 'Profile updated successfully', user: user.toJSON() });
  } catch (err) {
    res.status(500).json({ message: 'Could not update profile.', error: err.message });
  }
};

// GET /api/users/doctors  (public — list all doctors)
const getDoctors = async (req, res) => {
  try {
    const { specialization } = req.query;
    const filter = { role: 'doctor', isActive: true };
    if (specialization) filter.specialization = new RegExp(specialization, 'i');
    const doctors = await User.find(filter);
    res.json({ doctors });
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch doctors.', error: err.message });
  }
};

// GET /api/users/doctors/:id  (public)
const getDoctorById = async (req, res) => {
  try {
    const doctor = await User.findOne({ _id: req.params.id, role: 'doctor' });
    if (!doctor) return res.status(404).json({ message: 'Doctor not found.' });
    res.json({ doctor: doctor.toJSON() });
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch doctor.', error: err.message });
  }
};

module.exports = { registerUser, loginUser, getProfile, updateProfile, getDoctors, getDoctorById };