// controllers/auth.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Doctor from '../models/Doctor.js';

export const registerDoctor = async (req, res) => {
  try {
    const { firstName, lastName, email, password, specialization } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newDoctor = new Doctor({
      firstName,
      lastName,
      email,
      password: passwordHash,
      specialization
    });

    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email: email });
    if (!doctor) return res.status(400).json({ msg: "Doctor does not exist." });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, doctor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
