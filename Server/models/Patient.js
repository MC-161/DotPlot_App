import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    _id: { type: Number, required: true,},
    name: { type: String, required: true },
    age: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    history: { type: String, required: true },
    scans: [{ type: Number }] // Change from ObjectId to Number
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
