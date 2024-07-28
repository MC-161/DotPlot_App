// components/PatientTable.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '@/config';
import ConfirmationModal from '@/components/ConfirmationModal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PatientTable: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [search, setSearch] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [patientToDelete, setPatientToDelete] = useState<string | null>(null);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/patients`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        setPatients(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching patients.');
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleSort = (column: string) => {
    const isAsc = sortColumn === column && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortColumn(column);
  };

  const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement>, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const openDeleteModal = (id: string) => {
    setPatientToDelete(id);
    setModalOpen(true);
  };

  const closeDeleteModal = () => {
    setModalOpen(false);
    setPatientToDelete(null);
  };

  const handleDelete = async () => {
    if (patientToDelete) {
      try {
        await axios.delete(`${BaseUrl}/patients/${patientToDelete}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        setPatients(prevPatients => prevPatients.filter(patient => patient._id !== patientToDelete));
        toast.success('Patient deleted successfully!');
      } catch (err) {
        toast.error('Error deleting patient.');
      } finally {
        closeDeleteModal();
      }
    }
  };

  const filteredPatients = patients
    .filter(patient => patient.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    })
    .slice((page - 1) * rowsPerPage, page * rowsPerPage);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-md border-gray-300 flex-grow"
        />
        <button
          onClick={() => navigate('/patient/add')} // Navigate to the add patient page
          className="ml-4 p-2 bg-purple-700 text-white rounded-lg hover:bg-blue-600"
        >
          Add Patient
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-purple-100 text-purple-700 border-b">
            <th className="p-2 cursor-pointer" onClick={() => handleSort('id')}>Patient ID</th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('name')}>Patient Name</th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('age')}>Age</th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('height')}>Height</th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('weight')}>Weight</th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('history')}>History</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map(patient => (
            <tr key={patient._id} className="border-b hover:bg-gray-100">
              <td className="p-2">{patient._id}</td>
              <td className="p-2">{patient.name}</td>
              <td className="p-2">{patient.age}</td>
              <td className="p-2">{patient.height}</td>
              <td className="p-2">{patient.weight}</td>
              <td className="p-2">{patient.history}</td>
              <td className="p-2">
                <button
                  onClick={() => navigate(`/patient/${patient._id}`)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  View
                </button>
                <button
                  onClick={() => navigate(`/patient/edit/${patient._id}`)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(patient._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center mt-4">
        <button
          onClick={(e) => handlePageChange(e, page - 2)}
          disabled={page === 1}
          className="p-2 bg-purple-500 text-white rounded-lg mr-2 hover:bg-purple-600"
        >
          Previous
        </button>
        <span className="mr-2">Page {page}</span>
        <button
          onClick={(e) => handlePageChange(e, page)}
          disabled={page * rowsPerPage >= patients.length}
          className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Next
        </button>
        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="ml-4 p-2 border rounded-md border-gray-300"
        >
          {[10, 25, 50].map(rows => (
            <option key={rows} value={rows}>
              {rows} rows per page
            </option>
          ))}
        </select>
      </div>

      <ConfirmationModal
        isOpen={modalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this patient?"
      />

      <ToastContainer />
    </div>
  );
};

export default PatientTable;
