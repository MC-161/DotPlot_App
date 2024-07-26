import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true }
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

export default Doctor;
