import { useState, useEffect } from 'react';
import { BaseUrl } from '@/config'; // Adjust the import path if needed

interface UsePatientCountResult {
  count: number | null | string;
  loading: boolean;
  error: string | null;
}

const usePatientCount = (): UsePatientCountResult => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const Base = BaseUrl;
  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');  
  useEffect(() => {
    const fetchPatientCount = async () => {
      try {
        const response = await fetch(`${BaseUrl}/patients/count`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCount(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientCount();
  }, [Base]);

  return { count, loading, error };
};

export default usePatientCount;
