import React, { useState } from 'react';
import axios from 'axios';
import { IoEyeOutline, IoEyeOffSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FcInfo } from "react-icons/fc";

const Login = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleLogin = () => {
    if (email === '' || password === '') {
      toast('Please fill both email and password', {
        icon: <FcInfo />,
        position: "top-right"
      });

    } else {
      setLoading(true);
      const payload = {
        email,
        password,
      };

      axios
        .post(baseUrl + '/login', payload)
        .then((res) => {
          if (res?.data?.token) {
            localStorage.setItem('token', res?.data?.token);
            localStorage.setItem('user', JSON.stringify(res?.data?.user));
            toast.success(res?.data?.message, { position: "top-right" });
            setTimeout(() => {
              navigate('/');
            }, 1000);

          } else {
            toast.error("Something went wrong", { position: "top-right" });
          }
        })
        .catch((err) => toast.error(err?.response?.data?.message, { position: "top-right" }))
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh]"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Toaster />

      <div className="lg:w-[50%] w-80 m-auto shadow-xl p-8 rounded-md bg-white bg-opacity-80">
        <h2 className="text-2xl text-primaryColor font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email:</label>
          <input
            type="email"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-primaryColor"
            placeholder="example@address.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-600">Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-primaryColor"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="absolute top-11 right-4 transform -translate-y-1/2 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoEyeOffSharp size={18} /> : <IoEyeOutline size={18} />}
          </button>
        </div>
        <button
          className={`bg-[#24919B] w-full text-white p-2 rounded-md mt-4 hover:bg-gray-500 focus:outline-none  ${loading ? 'cursor-wait' : ''}`}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>

        <div>
          <p className='text-center text-sm mt-5' >Don't have account ? <Link to="/register" className='text-primaryColor font-bold' >Create account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
