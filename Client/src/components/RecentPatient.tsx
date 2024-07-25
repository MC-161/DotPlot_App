import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import useRecentPatients from "@/hooks/useRecentPatients";

const RecentPatient = () => {
  const { patients, loading, error } = useRecentPatients();
  console.log(patients)

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="shadow-xl border-[1px] rounded-md p-4">
      <div className="w-full">
        <p className="pl-2 pt-3 pb-3 font-medium text-md">Recent Patients</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Patient ID</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Height</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>History</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {patients.map(patient => (
            <TableRow key={patient._id}>
              <TableCell>{patient._id}</TableCell>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.height}cm</TableCell>
              <TableCell>{patient.weight}kg</TableCell>
              <TableCell>{patient.history}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentPatient;
