import express from 'express';
import Scan from '../models/Scan.js';
import path from 'path';

const router = express.Router();



// add Scan
router.post('/', async (req, res) => {
  try {
      const newScan = new Scan({
          ...req.body,
          imagePath: `/images/${req.body.id}.png`  // Adjust this based on your image naming convention
      });
      await newScan.save();
      res.status(201).json(newScan);
  } catch (err) {
      res.status(400).send(err.message);
  }
});


export default router;
