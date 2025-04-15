import axios from 'axios';
import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const ProfileEdit = ({ getUserData }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [gender, setGender] = useState(user.gender);
    const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
    const [loading, setLoading] = useState(false);
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const token = localStorage.getItem('token');
    const [isOpen, setIsOpen] = useState(false);

    const UpdateFunc = () => {
        setLoading(true);
        const payload = { name, email, phoneNumber, gender, dateOfBirth };

        const headers = {
            'Authorization': `${token}`
        };

        axios.patch(baseUrl + `/update-user-by-id/${user._id}`, payload, { headers })
            .then((res) => {
                if (res.status === 200) {
                    setLoading(false);
                    setUser(res.data.user);
                    getUserData();
                    setIsOpen(false);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    toast.success('Profile has been updated', { position: "top-right" });
                }
            })
            .catch((err) => {
                toast.error("Something went wrong", { position: "top-right" });
                console.log(err);
                setLoading(false);
            });
    };

    return (
        <>
            <Toaster />
            {isOpen && (
                <div className="z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="max-h-[370px] lg:w-1/2 w-full overflow-y-auto border border-gray-300 dark:border-gray-700 p-8 bg-white dark:bg-gray-900 shadow-xl rounded-md register-form">
                        <h2 className="text-2xl font-bold mb-4 text-primaryColor dark:text-white">Update</h2>
                        <div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Name:</label>
                                <input
                                    type="text"
                                    value={name}
                                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-primaryColor dark:bg-gray-800 dark:text-white dark:border-gray-600"
                                    placeholder="Enter your name..."
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Email:</label>
                                <input
                                    type="email"
                                    value={email}
                                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-primaryColor dark:bg-gray-800 dark:text-white dark:border-gray-600"
                                    placeholder="example@address.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Phone:</label>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-primaryColor dark:bg-gray-800 dark:text-white dark:border-gray-600"
                                    placeholder="Mobile number..."
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>

                            <div className="mb-4 lg:grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Gender:</label>
                                    <select
                                        className="mt-1 p-2 py-2.5 w-full border rounded-md focus:outline-none focus:border-primaryColor dark:bg-gray-800 dark:text-white dark:border-gray-600"
                                        onChange={(e) => setGender(e.target.value)}
                                        value={gender}
                                    >
                                        <option value="">Select...</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="others">Others</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block lg:mt-0 mt-3 text-sm font-medium text-gray-600 dark:text-gray-300">DOB:</label>
                                    <input
                                        value={dateOfBirth}
                                        type="date"
                                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-primaryColor dark:bg-gray-800 dark:text-white dark:border-gray-600"
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-3 justify-end mt-4'>
                            <button
                                className={`bg-primaryColor text-white p-2 rounded-md hover:bg-gray-500 focus:outline-none focus:border-blue-700 ${loading ? 'cursor-wait' : ''}`}
                                onClick={UpdateFunc}
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Update'}
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className='bg-gray-400 dark:bg-gray-600 rounded-md px-4 text-white'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={() => setIsOpen(true)}>
                {loading ? 'Updating...' : <FaEdit className='text-2xl text-primaryColor dark:text-primaryColor' />}
            </button>
        </>
    );
};

export default ProfileEdit;
