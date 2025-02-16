import React, { useState } from 'react';
import axios from 'axios';
import { IoEyeOutline, IoEyeOffSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FcInfo } from "react-icons/fc";

const Register = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const Register = () => {
    console.log("hello world",baseUrl)
    setLoading(true);

    if (name === '' || email === '' || phoneNumber === '' || gender === '' || dateOfBirth === '' || password === '') {
      toast('Please fill all the details', {
        icon: <FcInfo />,
        position: "top-right"
      });
      setLoading(false);

    } else {
      let payload = {
        name,
        email,
        password,
        phoneNumber,
        gender,
        dateOfBirth,
      };


      axios
        .post(`${baseUrl}/register`, payload)
        .then((res) => {
          if (res.data.userId) {
            toast.success(res?.data?.message, { position: "top-right" })
            setTimeout(() => {
              navigate('/login');
            }, 1000);
          } else {
            toast.error(res.data.message, { position: "top-right" });
          }
        })
        .catch((error) => toast.error('Something went wrong', { position: "top-right" }))
        .finally(() => setLoading(false));
    }


  };

  return (
    <div className='flex items-center justify-center h-[100vh]'
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Toaster />

      <div className="lg:w-[50%] w-80 max-h-[370px] overflow-y-auto border p-8 bg-white shadow-xl rounded-md bg-opacity-80 register-form">
        <h2 className="text-2xl font-bold mb-4 text-primaryColor ">Register</h2>
        <div className=''>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Name:</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-primaryColor"
              placeholder="Enter your name..."
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Phone:</label>
            <input
              type="tel"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-primaryColor"
              placeholder="Mobile number..."
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-4 lg:grid  grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-600">Gender:</label>
              <select
                className="mt-1 p-2 py-2.5 w-full border rounded-md focus:outline-none focus:border-primaryColor"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div>
              <label className="block lg:mt-0 mt-3 text-sm font-medium text-gray-600">DOB:</label>
              <input
                type="date"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-primaryColor"
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
          </div>

        </div>
        <button
          className={`w-full bg-primaryColor text-white p-2 rounded-md hover:bg-gray-500 focus:outline-none focus:border-blue-700 ${loading ? 'cursor-wait' : ''}`}
          onClick={Register}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Register'}
        </button>
        <div>
          <p className='text-center text-sm mt-5' >Already have account ? <Link to="/login" className='text-primaryColor font-bold' >Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
