import { Router } from 'express';
import patientRoutes from './patientRoutes.js'
import scanRoutes from './scanRoutes.js'
import authRoutes from './authRoutes.js'
const router = Router();

// Use patient routes
router.use('/patients', patientRoutes)
router.use('/scans', scanRoutes)
router.use('/auth', authRoutes)

export default router;