import { useState, useEffect } from 'react';
import { BaseUrl } from '@/config'; // Adjust the import path if needed

interface UseScanCountResult {
  count: number | null | string;
  loading: boolean;
  error: string | null;
}

const useScanCount = (): UseScanCountResult => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const Base = BaseUrl;
  const token = localStorage.getItem('token');  

  useEffect(() => {
    const fetchScanCount = async () => {
      try {
        const response = await fetch(`${Base}/scans/count`, {
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

    fetchScanCount();
  }, [Base]);

  return { count, loading, error };
};

export default useScanCount;