import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '@/config';

type ScanForm = {
  scanId: string;
  coordinates: string;
  date: string;
  diagnosis: 'Benign' | 'Malignant' | 'default';
  imagePath: File | null;
  patientId: string;
};

type Patient = {
  _id: string;
  name: string;
};

const token = localStorage.getItem('token');

const Scans: React.FC = () => {
  const [formData, setFormData] = useState<ScanForm>({
    scanId: '',
    coordinates: '',
    date: '',
    diagnosis: 'default',
    imagePath: null,
    patientId: '',
  });

  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchUniqueScanId();
    fetchPatients();
  }, []);

  const fetchUniqueScanId = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/scans/generateUniqueScanId`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData(prev => ({ ...prev, scanId: response.data.scanId }));
    } catch (err) {
      console.error('Error generating unique scan ID', err);
      setError('Error generating unique scan ID.');
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/patients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPatients(response.data);
    } catch (err) {
      console.error('Error fetching patients', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, imagePath: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('scanId', formData.scanId);
      formDataToSend.append('coordinates', formData.coordinates);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('diagnosis', formData.diagnosis);
      formDataToSend.append('imagePath', formData.imagePath as File);

      await axios.post(`${BaseUrl}/scans`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      await axios.post(`${BaseUrl}/patients/assignScan`, {
        patientId: formData.patientId,
        scanId: formData.scanId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setSuccess('Scan uploaded and assigned to patient successfully.');
      setFormData({
        scanId: '',
        coordinates: '',
        date: '',
        diagnosis: 'default',
        imagePath: null,
        patientId: '',
      });
      fetchUniqueScanId(); // Generate new scan ID for next scan
    } catch (err) {
      console.error('Error uploading and assigning scan', err);
      setError('Error uploading and assigning scan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Upload and Assign Scan</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="scanId">Scan ID</label>
            <input
              type="text"
              id="scanId"
              name="scanId"
              value={formData.scanId}
              onChange={handleChange}
              className="p-2 border rounded-md w-full"
              readOnly
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="coordinates">Coordinates</label>
            <input
              type="text"
              id="coordinates"
              name="coordinates"
              value={formData.coordinates}
              onChange={handleChange}
              className="p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="diagnosis">Diagnosis</label>
            <select
              id="diagnosis"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              className="p-2 border rounded-md w-full"
              required
            >
              <option value="default">Select a diagnosis</option>
              <option value="Benign">Benign</option>
              <option value="Malignant">Malignant</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="imagePath">Scan Image</label>
            <input
              type="file"
              id="imagePath"
              name="imagePath"
              onChange={handleFileChange}
              className="p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="patientId">Patient</label>
            <select
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              className="p-2 border rounded-md w-full"
              required
            >
              <option value="" disabled>Select a patient</option>
              {patients.map(patient => (
                <option key={patient._id} value={patient._id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload and Assign Scan'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Scans;
