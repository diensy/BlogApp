import React from 'react';

const AreYouSureModal = ({ isOpen, onClose, onConfirm, onCancel, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute z-40 inset-0 bg-gray-500 opacity-75"
                onClick={onClose}
            ></div>
            <div className="relative z-50 bg-white dark:bg-slate-800 text-black dark:text-white p-8 rounded-md shadow-lg transition-colors duration-300">
                <h2 className="text-xl mb-4">{title}</h2>
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 text-white px-4 py-2 mr-2 rounded hover:bg-red-600"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                    >
                        Yes
                    </button>
                    <button
                        className="bg-gray-300 dark:bg-gray-600 dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                        onClick={onCancel}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AreYouSureModal;
