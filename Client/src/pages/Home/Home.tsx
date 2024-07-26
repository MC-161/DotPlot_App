
import { Avatar } from '@mui/material';
import doctorImg from '@/assets/doctor.webp';
import StatCard from '@/components/StatCard';
import RecentPatient from '@/components/RecentPatient';
import usePatientCount from '@/hooks/usePatientCount';
import useScanCount from '@/hooks/useScanCount';
import useRecentPatients from '@/hooks/useRecentPatients';
import { useAuth } from '@/components/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { count: patientCount, loading: patientLoading, error: patientError } = usePatientCount();
  const { count: scanCount, loading: scanLoading, error: scanError } = useScanCount();
  const { loading: recentPatientsLoading, error: recentPatientsError } = useRecentPatients();

  const { logout } = useAuth();
  const navigate = useNavigate();

  const isLoading = patientLoading || scanLoading || recentPatientsLoading;
  const hasError = patientError || scanError || recentPatientsError;

  if (isLoading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (hasError) return <div className="h-screen flex items-center justify-center">Error: {patientError || scanError || recentPatientsError}</div>;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-screen">
      <nav className="w-full flex items-end justify-between p-4 text-white">
        <div className="ml-auto flex items-center space-x-4">
          <Avatar className="border-2 border-purple-800" sx={{ width: 36, height: 36 }} src={doctorImg} />
          <p className='text-black'>Doctor</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="Keymetrics mt-10 grid grid-cols-3 gap-10">
        <StatCard title="Total Patient" stat={patientCount ?? 0} />
        <StatCard title="Total Scans" stat={scanCount ?? 0} />
      </div>
      <div className="mt-10">
        <RecentPatient />
      </div>
    </div>
  );
};

export default Home;
