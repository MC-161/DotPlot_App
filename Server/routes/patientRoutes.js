import express from 'express';
import {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientCount,
  getLimitedPatients
} from '../controllers/patientController.js';

import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Protected Routes
router.get('/limited', verifyToken, getLimitedPatients);
router.get('/count', verifyToken, getPatientCount);
router.get('/', verifyToken, getPatients); // Get all patients
router.get('/:id', verifyToken, getPatientById); // Get patient by ID
router.post('/', verifyToken, createPatient); // Create a new patient
router.put('/:id', verifyToken, updatePatient); // Update patient by ID
router.delete('/:id', verifyToken, deletePatient); // Delete patient by ID


export default router;
