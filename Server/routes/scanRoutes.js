import express from 'express';
import upload from '../middleware/upload.js';
import {
  getScans,
  getScanById,
  createScan,
  updateScan,
  deleteScan,
  uploadScan,
  assignScanToPatient,
  getScanCount,
  getLimitedScans,
  checkScanId,
  generateUniqueScanId
} from '../controllers/scanController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();


// Protected Routes
router.get('/generateUniqueScanId', verifyToken, generateUniqueScanId); // Generate unique scan ID
router.get('/limited', verifyToken, getLimitedScans);
router.get('/checkScanId/:id', verifyToken, checkScanId);
router.get('/count', verifyToken, getScanCount);
router.get('/', verifyToken, getScans); // Get all scans
router.get('/:id', verifyToken, getScanById); // Get scan by ID
router.post('/', verifyToken, createScan); // Create a new scan
router.put('/:id', verifyToken, updateScan); // Update scan by ID
router.delete('/:id', verifyToken, deleteScan); // Delete scan by ID

// Route to upload scan
router.post('/upload', verifyToken, upload.single('scanImage'), uploadScan);
router.post('/assign', verifyToken, assignScanToPatient); // Ensure this route is included



export default router;
