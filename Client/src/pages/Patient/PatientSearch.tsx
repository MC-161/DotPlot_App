import { Avatar } from '@mui/material';
import doctorImg from '@/assets/doctor.webp';
import { useAuth } from '@/components/AuthContext';
import { useNavigate } from 'react-router-dom';
import PatientTable from './PatientTable';
import Breadcrumbs from '@/components/Breadcrumbs';

const PatientSearch = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-screen flex flex-col">
      <nav className="w-full flex items-center justify-between p-4 text-white">
        {/* Breadcrumbs Section */}
        <div className="flex-grow">
          <Breadcrumbs
            breadcrumbs={[
              { name: 'Patient Search', path: '#' }
            ]}
          />
        </div>
        {/* Doctor Info and Logout Button */}
        <div className="flex items-center space-x-4">
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
      <div className="p-4 flex-grow">
        <div className='text-xl font-semibold mb-4'>Patient Search</div>
        <PatientTable />
      </div>
    </div>
  );
};

export default PatientSearch;
