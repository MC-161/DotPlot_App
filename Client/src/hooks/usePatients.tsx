// hooks/usePatients.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthToken } from './useAuthToken';
import { BaseUrl } from '@/config';


export const usePatients = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');  

  useEffect(() => {
    const fetchPatients = async () => {
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BaseUrl}/patients`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
        });
        setPatients(response.data);
      } catch (err) {
        setError('Error fetching patients');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [token]);

  return { patients, loading, error };
};
