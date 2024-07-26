import { Avatar } from "@mui/material";
import doctorImg from "@/assets/doctor.webp"
import StatCard from "@/components/StatCard";
import RecentPatient from "@/components/RecentPatient";
import usePatientCount from '@/hooks/usePatientCount'; // Adjust the import path if needed
import useScanCount from "@/hooks/useScanCount";
import useRecentPatients from "@/hooks/useRecentPatients";

const Home = () => {
  const { count: patientCount, loading: patientLoading, error: patientError } = usePatientCount();
  const { count: scanCount, loading: scanLoading, error: scanError } = useScanCount();
  const { loading: recentPatientsLoading, error: recentPatientsError } = useRecentPatients();

  const isLoading = patientLoading || scanLoading || recentPatientsLoading;
  const hasError = patientError || scanError || recentPatientsError;

  if (isLoading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (hasError) return <div className="h-screen flex items-center justify-center">Error: {patientError || scanError || recentPatientsError}</div>;

  return (
    <div className="h-screen">
      <nav className="w-full flex items-end">
        <div className="ml-auto flex items-center space-x-4 mr-5">
          <Avatar className="border-2 border-purple-800" sx={{ width: 36, height: 36 }} src={doctorImg}/>
          <p>Doctor</p>
        </div>
      </nav>
    
      <div className=" Keymetrics mt-10 grid grid-cols-3 gap-10">
        <StatCard title="Total Patient" stat={patientCount ?? 0}/>
        <StatCard title="Total Scans" stat={scanCount ?? 0}/>
      </div>
      <div className="mt-10">
        <RecentPatient></RecentPatient>
      </div>

    </div>
  );
};

export default Home;
