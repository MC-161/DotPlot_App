import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Patient } from '@/types/patientDashTypes';
import { BaseUrl } from '@/config';
import 'tailwindcss/tailwind.css';

type EditPatientParams = Record<string, string | undefined>;

const token = localStorage.getItem('token');

const EditPatient: React.FC = () => {
  const { id } = useParams<EditPatientParams>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get<Patient>(`${BaseUrl}/patients/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setPatient(response.data);
      } catch (err) {
        setError('Error fetching patient data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPatient();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPatient(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${BaseUrl}/patients/${id}`, patient, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        navigate(`/patient/${id}`);
      }
    } catch (err) {
      setError('Error updating patient data');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!patient) {
    return <div>No patient data found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Patient Information</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={patient.name}
              onChange={handleChange}
              className="p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={patient.age}
              onChange={handleChange}
              className="p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="height">Height (cm)</label>
            <input
              type="number"
              id="height"
              name="height"
              value={patient.height}
              onChange={handleChange}
              className="p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="weight">Weight (kg)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={patient.weight}
              onChange={handleChange}
              className="p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="history">History</label>
            <textarea
              id="history"
              name="history"
              value={patient.history}
              onChange={handleChange}
              className="p-2 border rounded-md w-full"
            />
          </div>
          <button type="submit" className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">Update Patient</button>
        </form>
      </div>
    </div>
  );
};

export default EditPatient;
