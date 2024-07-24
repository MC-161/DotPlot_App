import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    history: { type: String, required: true },
    scanId: { type: Number, required: true }
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
