import React, { useState } from 'react';
import { useAuth } from '@/components/AuthContext';
import { AssessmentOutlined, AccessTimeFilledOutlined, SecurityOutlined } from '@mui/icons-material';
import logo from "@/assets/sonoLogo.jpg"

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      login(data.token); // Use context to handle login
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className=" relative flex-1 flex items-center justify-center bg-gradient-to-t from-[#20259E] via-[#321977] to-[#321977] p-10">
        <div className="text-white flex flex-col">
          <img className='w-72 absolute top-14 self-center rounded-md' src={logo} alt="" />
          <h2 className="text-4xl font-bold mb-4">Manage and Visualize Patient Data</h2>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <span className="material-icons"><AssessmentOutlined/></span>
              <span>Advanced data visualization</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="material-icons"><AccessTimeFilledOutlined/></span>
              <span>Access data 24/7</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="material-icons"><SecurityOutlined/></span>
              <span>Secure and private</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-10">
        <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-80">
          <h2 className="text-2xl font-bold mb-4">Welcome back</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-[#20259E] text-white p-2 rounded w-full hover:bg-[#4B50C1]"
          >
            Sign in
          </button>
          <p className="mt-4 text-center">
            Don't have an account? <a href="#" className="text-[#20259E]">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;


