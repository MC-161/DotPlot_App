// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import SideNav from '@/components/Navbar';
import PatientDash from './pages/Patient/PatientDash';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <SideNav />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<PatientDash />} />
            {/* Uncomment and add more routes as needed */}
            {/* <Route path="/search/player-stats" element={<PatientDash />} />
            <Route path="/search/team-stats" element={<PatientSearch />} />
            <Route path="/tools/comparison" element={<ScanUpload />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
