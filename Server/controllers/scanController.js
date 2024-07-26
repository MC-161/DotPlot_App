import Scan from "../models/Scan.js";
import path from 'path';
import Patient from '../models/Patient.js';


// Get all scans
export const getScans = async (req, res) => {
  try {
    const scans = await Scan.find();
    res.json(scans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLimitedScans = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10; // Default limit to 10 if not specified
  try {
    const scans = await Scan.find().limit(limit);
    res.status(200).json(scans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a scan by ID
export const getScanById = async (req, res) => {
  try {
    const scan = await Scan.findById(req.params.id);
    if (scan) {
      res.json(scan);
    } else {
      res.status(404).json({ message: 'Scan not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new scan
export const createScan = async (req, res) => {
  const scan = new Scan(req.body);
  try {
    const newScan = await scan.save();
    res.status(201).json(newScan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a scan by ID
export const updateScan = async (req, res) => {
  try {
    const updatedScan = await Scan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedScan) {
      res.json(updatedScan);
    } else {
      res.status(404).json({ message: 'Scan not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a scan by ID
export const deleteScan = async (req, res) => {
  try {
    const result = await Scan.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: 'Scan deleted' });
    } else {
      res.status(404).json({ message: 'Scan not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const uploadScan = async (req, res) => {
  try {
    const { scanId, coordinates, date, diagnosis } = req.body;
    const file = req.file;

    if (!file || !scanId || !coordinates || !date || !diagnosis) {
      return res.status(400).send('All fields are required.');
    }

    const scan = new Scan({
      _id: parseInt(scanId, 10),  // Ensure scanId is converted to a number
      coordinates,
      date,
      diagnosis,
      imagePath: path.join('data/images', file.filename)
    });

    await scan.save();
    res.status(200).send('Scan uploaded successfully.');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const assignScanToPatient = async (req, res) => {
  try {
    const { patientId, scanId } = req.body;
    
    if (!patientId || !scanId) {
      return res.status(400).send('Patient ID and Scan ID are required.');
    }

    const scan = await Scan.findById(scanId);
    if (!scan) {
      return res.status(404).send('Scan not found.');
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).send('Patient not found.');
    }

    if (!patient.scans.includes(scanId)) {
      patient.scans.push(scanId);
      await patient.save();
    }

    res.status(200).send('Scan assigned to patient successfully.');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getScanCount = async (req, res) => {
  try {
    const scanCount = await Scan.countDocuments();
    res.json(scanCount);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};