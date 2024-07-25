import { useState, useEffect } from 'react';
import { RecentPatient } from '@/types/patient'; // Adjust the import path if needed
import {BaseUrl} from "@/config"

interface UseRecentPatientsResult {
  patients: RecentPatient[];
  loading: boolean;
  error: string | null;
}


const useRecentPatients = (): UseRecentPatientsResult => {
  const [patients, setPatients] = useState<RecentPatient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const Base = BaseUrl

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${Base}/patients`); // Fetch recent patients
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: RecentPatient[] = await response.json();
        setPatients(data.slice(0, 6));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return { patients, loading, error };
};

export default useRecentPatients;
