import config from "./config.mjs"
import express from 'express';
import mongoose from 'mongoose';
import swaggerDocs from './swagger.js';
import Patient from "./models/Patient.js";
import Scan from "./models/Scan.js";
import fs from 'fs';


const createServer = () => {
  const app = express();
  const PORT = config.port || 6001;
  mongoose
    .connect(config.mongodbUri, {
    })
    .then(async () => {
      console.log("Connected to MongoDB");
      await insertDummyPatient(); // Call the function here
      app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
      swaggerDocs(app, PORT)
    })
    .catch((error) => console.log(`${error} did not connect`));
    return app
};



function parseDate(dateString) {
  const [day, month, year] = dateString.split('/');
  return new Date(`${year}-${month}-${day}`);
}

async function insertDummyPatient() {
  try {
    // Read JSON data
    const patientsData = JSON.parse(fs.readFileSync('data/patients.json', 'utf8'));
    const scansData = JSON.parse(fs.readFileSync('data/scans.json', 'utf8'));

    // Insert Scans first
    const savedScans = await Promise.all(Object.values(scansData).map(scanData => {
      const scan = new Scan({
        _id: scanData['US scan ID'], // Corrected to match the JSON key
        coordinates: scanData['Coordinates'],
        date: parseDate(scanData['Scan Date']), // Convert the date string
        diagnosis: scanData['Diagnosis'],
        imagePath: `data/images/${scanData['US scan ID']}.png` // Adjust path as needed
      });
      return scan.save();
    }));

    // Insert Patients
    const patientsWithScans = Object.values(patientsData).map(patientData => {
      const patientScans = patientData['US scan IDs'].map(scanId => {
        // Find saved scan with matching ID
        const scan = savedScans.find(scan => scan._id === scanId);
        return scan ? scan._id : null;
      }).filter(scanId => scanId !== null);

      return {
        _id: patientData['Patient ID'], // Use Patient ID as _id
        name: patientData['Patient Name'],
        age: patientData['Age'],
        height: patientData['Height (cm)'],
        weight: patientData['Weight (kg)'],
        history: patientData['History of breast cancer'],
        scans: patientScans
      };
    });

    await Patient.insertMany(patientsWithScans);

    console.log('Patient and scans inserted successfully!');
  } catch (error) {
    console.error('Error inserting dummy patient:', error);
  }
}


export default createServer;

