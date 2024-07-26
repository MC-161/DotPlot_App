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
  getScanCount
} from '../controllers/scanController.js';

const router = express.Router();


router.get('/limited', getLimitedScans);
router.get('/count', getScanCount);
router.get('/', getScans); // Get all scans
router.get('/:id', getScanById); // Get scan by ID
router.post('/', createScan); // Create a new scan
router.put('/:id', updateScan); // Update scan by ID
router.delete('/:id', deleteScan); // Delete scan by ID

// Route to upload scan
router.post('/upload', upload.single('scanImage'), uploadScan);
router.post('/assign', assignScanToPatient); // Ensure this route is included


export default router;
