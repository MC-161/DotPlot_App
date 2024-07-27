import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Patient, Scan } from '@/types/patientDashTypes';
import 'tailwindcss/tailwind.css';
import { BaseUrl } from '@/config';
import Spline from '@splinetool/react-spline';

// Define the type for route parameters
type PatientDashParams = Record<string, string | undefined>;
const token = localStorage.getItem('token');

const PatientDash: React.FC = () => {
  const { id } = useParams<PatientDashParams>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const splineRef = useRef<HTMLDivElement>(null);

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
      }
    };

    const fetchScans = async () => {
      try {
        const response = await axios.get<Scan[]>(`${BaseUrl}/scans`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          params: { patientId: id }
        });
        const sortedScans = response.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setScans(sortedScans);
      } catch (err) {
        setError('Error fetching scans');
      }
    };

    if (id) {
      fetchPatient();
      fetchScans();
    }

    setLoading(false);
  }, [id]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (splineRef.current && splineRef.current.contains(event.target as Node)) {
        event.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

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
      <div className="bg-white border-2 border-neutral-300 shadow-md rounded-lg p-6 mb-4">
        <h1 className="text-2xl font-bold mb-4">Patient Information</h1>
        <div className="mb-4">
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Height:</strong> {patient.height} cm</p>
          <p><strong>Weight:</strong> {patient.weight} kg</p>
          <p><strong>History:</strong> {patient.history}</p>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-lg p-6 mb-4 ">
        <h2 className="text-xl font-semibold mb-4">Visualization and Scan Details</h2>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Visualization */}
          <div className="lg:w-1/3 h-full flex justify-center items-center">
            <div className="h-64 mb-4 border-2 border-purple-800" ref={splineRef}>
              <Spline scene="https://prod.spline.design/kIVdHLsaUASlmvvm/scene.splinecode" />
            </div>
          </div>

          {/* Scans Details */}
          <div className="lg:w-2/3 h-72 overflow-y-scroll">
            <div className="grid grid-cols-3 gap-2">
              {scans.map(scan => (
                <div key={scan._id} className="bg-white shadow-md rounded-lg p-4 border mb-4">
                  <p><strong>Date:</strong> {new Date(scan.date).toLocaleDateString()}</p>
                  <p><strong>Diagnosis:</strong> {scan.diagnosis}</p>
                  <p><strong>Coordinates:</strong> {scan.coordinates}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4">Scan Images</h2>
      <div className="bg-white shadow-xl rounded-lg p-6 h-[600px] overflow-y-scroll">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {scans.map(scan => (
            <div key={scan._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={scan.imagePath}
                alt={`Scan ${scan._id}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p><strong>Date:</strong> {new Date(scan.date).toLocaleDateString()}</p>
                <p><strong>Diagnosis:</strong> {scan.diagnosis}</p>
                <p><strong>Coordinates:</strong> {scan.coordinates}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDash;