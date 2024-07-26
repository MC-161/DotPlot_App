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

  useEffect(() => {
    const fetchPatientCount = async () => {
      try {
        const response = await fetch(`${Base}/patients/count`);
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
