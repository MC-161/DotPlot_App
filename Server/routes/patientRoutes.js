import express from 'express';
import {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient
} from '../controllers/patientController.js';

const router = express.Router();

router.get('/', getPatients); // Get all patients
router.get('/:id', getPatientById); // Get patient by ID
router.post('/', createPatient); // Create a new patient
router.put('/:id', updatePatient); // Update patient by ID
router.delete('/:id', deletePatient); // Delete patient by ID

export default router;
