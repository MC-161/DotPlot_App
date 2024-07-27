import Patient from "../models/Patient.js";

// Get all patients
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLimitedPatients = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10; // Default limit to 10 if not specified
  try {
    const patients = await Patient.find().limit(limit);
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a patient by ID
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (patient) {
      res.status(200).json(patient);
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// controllers/patientController.js

export const createPatient = async (req, res) => {
  const { _id, name, age, height, weight, history } = req.body;

  if (!_id || !name || !age || !height || !weight) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const patient = new Patient({
    _id,
    name,
    age,
    height,
    weight,
    history,
  });

  try {
    const newPatient = await patient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Update a patient by ID
export const updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedPatient) {
      res.status(200).json(updatedPatient);
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a patient by ID
export const deletePatient = async (req, res) => {
  try {
    const result = await Patient.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: 'Patient deleted' });
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPatientCount = async (req, res) => {
  try {
    const patientCount = await Patient.countDocuments();
    res.json(patientCount);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};