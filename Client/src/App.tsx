import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "@/pages/Home/Home";
import SideNav from "@/components/Navbar";
import PatientDash from "@/pages/Patient/PatientDash";
import Login from "@/pages/Login/LoginForm";
import { AuthProvider } from "./components/AuthContext";

const AppContent: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <AuthProvider>
      <div className="flex h-screen">
        {!isLoginPage && <SideNav />}
        <main className={`flex-1 p-6`}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/patientSearch" element={<PatientDash />} />
            {/* Add more protected routes as needed */}
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
