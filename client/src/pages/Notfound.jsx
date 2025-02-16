import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div
            className="flex items-center justify-center h-[100vh] bg-cover bg-center"
            style={{
                backgroundImage:
                    'url("https://cdn3.vectorstock.com/i/1000x1000/49/82/error-404-page-not-found-creative-web-design-vector-46724982.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="text-center text-black border bg-white p-4 bg-opacity-80 rounded-lg">
                <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
                <p className="text-lg mb-4">Oops! The page you are looking for does not exist.</p>

                <p className="text-lg mb-4">Let's get you back on track:</p>
                <Link to="/" className="text-blue-500 hover:underline">
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
