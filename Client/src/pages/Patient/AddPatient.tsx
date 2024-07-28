// components/AddPatient.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '@/config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddPatient: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number | string>('');
  const [height, setHeight] = useState<number | string>('');
  const [weight, setWeight] = useState<number | string>('');
  const [history, setHistory] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const generateUniqueId = () => {
    return `${Math.floor(Math.random() * 10000)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Submitting patient data...');
      const response = await axios.post(`${BaseUrl}/patients`, {
        _id: generateUniqueId(), // Generate a unique ID
        name,
        age: parseInt(age as string, 10),
        height: parseInt(height as string, 10),
        weight: parseInt(weight as string, 10),
        history,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Response:', response);
      toast.success('Patient added successfully!');
      navigate('/patientSearch');
    } catch (err) {
      console.error('Error adding patient:', err);
      toast.error('Error adding patient.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Patient</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded-md border-gray-300 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="p-2 border rounded-md border-gray-300 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="p-2 border rounded-md border-gray-300 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="p-2 border rounded-md border-gray-300 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">History:</label>
          <textarea
            value={history}
            onChange={(e) => setHistory(e.target.value)}
            className="p-2 border rounded-md border-gray-300 w-full"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Patient'}
        </button>
      </form>
    </div>
  );
};

export default AddPatient;
