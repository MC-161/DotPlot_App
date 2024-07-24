import { Router } from 'express';
import patientRoutes from './patientRoutes.js'
import scanRoutes from './scanRoutes.js'
const router = Router();

// Use patient routes
router.use('/', patientRoutes)
router.use('/', scanRoutes)

export default router;