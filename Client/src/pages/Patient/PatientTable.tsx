// components/PatientTable.tsx
import React, { useState } from 'react';
import { usePatients } from '@/hooks/usePatients';


const PatientTable: React.FC = () => {
  const { patients, loading, error } = usePatients();
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [search, setSearch] = useState<string>('');

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
    <div className="p-4 bg-white shadow-md rounded-lg">
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 mb-4 border rounded-md border-gray-300"
      />
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
            <tr key={patient.id} className="border-b hover:bg-gray-100">
              <td className="p-2">{patient._id}</td>
              <td className="p-2">{patient.name}</td>
              <td className="p-2">{patient.age}</td>
              <td className="p-2">{patient.height}</td>
              <td className="p-2">{patient.weight}</td>
              <td className="p-2">{patient.history}</td>
              <td className="p-2">
                <button 
                  onClick={() => window.location.href = `/patient/${patient._id}`} 
                  className="text-blue-500 hover:underline mr-2"
                >
                  View
                </button>
                <button 
                  onClick={() => window.location.href = `/patient/edit/${patient._id}`} 
                  className="text-blue-500 hover:underline"
                >
                  Edit
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
    </div>
  );
};

export default PatientTable;
