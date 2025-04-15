import React, { useEffect, useState } from 'react';
import { FaRegUserCircle, FaHome } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import AreYouSureModal from './AreYouSureModal';

export default function Navbar() {
    const navigate = useNavigate();
    const User = JSON.parse(localStorage.getItem('user'));

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const handleLogout = () => {
        setIsLogoutModalOpen(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setIsLogoutModalOpen(false);
        navigate('/login');
    };

    const cancelLogout = () => {
        setIsLogoutModalOpen(false);
    };

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    return (
        <div className='sticky top-0 z-10 w-full'>
            <nav className='shadow-lg py-5 px-8 flex flex-wrap items-center justify-between bg-white dark:bg-slate-800 text-black dark:text-white transition-colors'>

                {/* Left side: Home only */}
                <div className='flex items-center gap-6'>
                    <button onClick={() => navigate('/')}>
                        <FaHome size={25} className='text-[#24919b]' />
                    </button>
                </div>

                {/* Right side: Dark Mode, User */}
                <div className='flex items-center gap-6'>
                    <button onClick={toggleDarkMode}>
                        {darkMode ? (
                            <FiSun size={22} className='hover:text-yellow-400' />
                        ) : (
                            <FiMoon size={22} className='hover:text-blue-400' />
                        )}
                    </button>

                    <div className='relative flex items-center gap-2 cursor-pointer'>
                        <p className='font-bold text-[#24919b]'>{User?.name}</p>
                        <div onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                            <FaRegUserCircle size={28} className='text-[#24919b]' />
                        </div>

                        {/* Dropdown */}
                        {isDropdownOpen && (
                            <div
                                className='absolute top-7 right-3 bg-white dark:bg-gray-700 border shadow-md px-6 py-2 rounded z-10'
                                onMouseEnter={() => setIsDropdownOpen(true)}
                                onMouseLeave={() => setIsDropdownOpen(false)}
                            >
                                <Link to="/profile" className='block hover:text-[#24919b]'>Profile</Link>
                                <button onClick={handleLogout} className='block py-1 hover:text-[#24919b]'>Logout</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Logout Modal */}
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
