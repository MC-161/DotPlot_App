import { Avatar } from "@mui/material";
import doctorImg from "@/assets/doctor.webp"
import StatCard from "@/components/StatCard";
import RecentPatient from "@/components/RecentPatient";

const Home = () => {
  return (
    <div className="h-screen">
      <nav className="w-full flex items-end">
        <div className="ml-auto flex items-center space-x-4 mr-5">
          <Avatar className="border-2 border-purple-800" sx={{ width: 36, height: 36 }} src={doctorImg}/>
          <p>Doctor</p>
        </div>
      </nav>
    
      <div className=" Keymetrics mt-10 grid grid-cols-3 gap-10">
        <StatCard title="Total Patient" stat={10}/>
        <StatCard title="Total Scans" stat={50}/>
      </div>
      <div className="mt-10">
        <RecentPatient></RecentPatient>
      </div>

    </div>
  );
};

export default Home;
