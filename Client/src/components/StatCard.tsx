import { Person2Outlined } from "@mui/icons-material";

interface StatCardProps {
  title: string; // Assuming title is a string
  stat: number | string; // Assuming stat can be either a number or a string
}

const StatCard: React.FC<StatCardProps> = ({ title, stat }) => {
  return (
    <div className="statcard shadow-xl shadow-slate-300 rounded-md p-3 cursor-pointer">
      <p className="title text-lg font-normal">{title}</p>
      <div className="flex">
        <Person2Outlined className="p-1" fontSize="medium"/>
        <p className="title text-sm font-normal">{title}</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="pl-2 text-2xl font-semibold">{stat}</p>
        <p className="text-xs rounded-md bg-purple-300 pt-0.5
        pb-0.5 pl-2 pr-2">+10.65%</p>
      </div>
    </div>
  );
};

export default StatCard;
