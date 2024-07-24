import Patient from '../models/Patient.js'

export const getAllPlayers = async (req, res) => {
  try {
    const patient = await Patient.find();
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};