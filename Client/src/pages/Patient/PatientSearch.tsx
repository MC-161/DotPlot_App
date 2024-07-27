
import { Avatar } from '@mui/material';
import doctorImg from '@/assets/doctor.webp';
import { useAuth } from '@/components/AuthContext';
import { useNavigate } from 'react-router-dom';
import PatientTable from './PatientTable';

const PatientSearch = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();

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
      <PatientTable></PatientTable>
    </div>
  );
};

export default PatientSearch;
