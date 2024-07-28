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
            'Content-Type': 'application/json',
          },
        });
        setPatient(response.data);
      } catch (err) {
        setError('Error fetching patient data');
        setLoading(false);
      }
    };

    if (id) {
      fetchPatient();
    }
  }, [id]);

  useEffect(() => {
    const fetchScans = async () => {
      if (patient) {
        try {
          const response = await axios.get<Scan[]>(`${BaseUrl}/scans`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          const patientScanIds = new Set(patient.scans);
          const filteredScans = response.data.filter((scan) => patientScanIds.has(scan._id));
          const sortedScans = filteredScans.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setScans(sortedScans);
        } catch (err) {
          setError('Error fetching scans');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchScans();
  }, [patient]);

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

  const handleClick = (imagePath: string) => {
    const filename = imagePath.split('/').pop(); // Extract filename
    const imageUrl = `${BaseUrl}/images/${filename}`; // Construct URL for image
    window.open(imageUrl, '_blank'); // Open image in a new tab
  };

  return (
    <div className="container mx-auto p-4 h-full">
      <div className="bg-white border-2 border-neutral-300 shadow-md rounded-lg p-6 mb-4">
        <h1 className="text-2xl font-bold mb-2">Patient Information</h1>
        <div className="">
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Height:</strong> {patient.height} cm</p>
          <p><strong>Weight:</strong> {patient.weight} kg</p>
          <p><strong>History:</strong> {patient.history}</p>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-lg p-6 mb-4">
        <h2 className="text-xl font-semibold mb-4">Visualization</h2>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Visualization */}
          <div className="lg:w-1/3 h-full flex justify-center items-center">
            <div className="h-64 mb-4 border-2 border-purple-800" ref={splineRef}>
              <Spline scene="https://prod.spline.design/kIVdHLsaUASlmvvm/scene.splinecode" />
            </div>
          </div>

          {/* Scan Details */}
          <div className="lg:w-2/3 h-72 overflow-y-scroll">
            <div className="grid grid-cols-3 gap-2">
              {scans.map((scan) => (
                <div
                  key={scan._id}
                  className="bg-white shadow-md rounded-lg p-4 border mb-4 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-purple-500 hover:shadow-lg"
                  onClick={() => handleClick(scan.imagePath)}
                >
                  <p><strong>Date:</strong> {new Date(scan.date).toLocaleDateString()}</p>
                  <p><strong>Diagnosis:</strong> {scan.diagnosis}</p>
                  <p><strong>Coordinates:</strong> {scan.coordinates}</p>
                  <p className="text-purple-700">Click to view image</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDash;
