import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AreYouSureModal from './AreYouSureModal';

export default function Navbar() {
    const navigate = useNavigate();

    const User = JSON.parse(localStorage.getItem('user'));
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);



    const handleLogout = () => {
        setIsLogoutModalOpen(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setIsLogoutModalOpen(false);
        navigate('/login')
    };

    const cancelLogout = () => {
        setIsLogoutModalOpen(false);
    };

    return (
        <div className='sticky top-0 z-10 w-[100%]'>
            <nav className='shadow-lg bg-white py-5 px-8 flex items-center justify-between'>
                <button onClick={() => navigate('/')}>
                    <FaHome size={30} color='#24919b' />
                </button>
                <div className='relative'>
                    <div className='flex items-center gap-3 cursor-pointer'>
                        <p className='font-bold text-[#24919b]'>{User?.name}</p>
                        <div onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                            <FaRegUserCircle className='h-7 w-7' size={30} color='#24919b' />
                        </div>
                    </div>
                    {isDropdownOpen && (
                        <div className='absolute top-18 right-0 bg-white border shadow-md px-6 rounded' onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                            <Link to="/profile" className='block py-1 hover:text-[#24919b]'>
                                Profile
                            </Link>
                            <button onClick={handleLogout} className='block py-1 hover:text-[#24919b]'>
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* Use AreYouSureModal for Logout Confirmation */}
                <AreYouSureModal
                    isOpen={isLogoutModalOpen}
                    onClose={() => setIsLogoutModalOpen(false)}
                    onConfirm={confirmLogout}
                    onCancel={cancelLogout}
                    title="Are you sure you want to logout?"
                />
            </nav>
        </div>
    );
}
