import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const BlogEditModal = ({ isOpen, onClose, BlogId, getPosts }) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [catagory, setCatagory] = useState("")
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false)

    const handleSave = () => {
        setLoading(true);
        const data = {
            title: title || BlogId?.title,
            description: description || BlogId?.description,
            image: image || BlogId?.image,
            catagory: catagory || BlogId?.catagory
        }
        const headers = {
            'Authorization': `${token}`
        };
        axios.put(baseUrl + `/posts/${BlogId?._id}`, data, { headers })
            .then((res) => {
                toast.success('Your Blog updated successfully', { position: "top-right" });
                getPosts()
                onClose()
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                toast.error('Something went wrong', { position: "top-right" });
                console.log(err)
            })
    };

    return (
        <>
            <Toaster />
            {isOpen && (
                <div className="z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md">
                        <label className="block mb-2 font-bold text-gray-800">Edit Value:</label>
                        <input
                            type="text"
                            defaultValue={BlogId?.title}
                            // value={title}
                            placeholder="Title"
                            onChange={(e) => setTitle(e.target.value)}
                            className="border rounded-md p-2 w-full mb-4"
                        />
                        <textarea
                            type="text"
                            defaultValue={BlogId?.description}
                            placeholder="Descriptions..."
                            onChange={(e) => setDescription(e.target.value)}
                            className="border rounded-md p-2 w-full mb-4"
                        />
                        <input
                            type="text"
                            defaultValue={BlogId?.image}
                            placeholder="Image URL"
                            onChange={(e) => setImage(e.target.value)}
                            className="border rounded-md p-2 w-full mb-4"
                        />
                        <select name="" id=""
                            className='border rounded-md p-2 w-full mb-4'
                            defaultValue={BlogId?.catagory}
                            onChange={(e) => setCatagory(e.target.value)}>
                            <option value="">Choose Catagory</option>
                            <option value="tech">Tech</option>
                            <option value="beauty">Beauty</option>
                            <option value="food">Food</option>
                            <option value="travel">Travel</option>
                            <option value="motivations">Motivations</option>
                            <option value="nature">Nature</option>
                            <option value="fashion">Fashion</option>
                            <option value="life style">Life Style</option>
                            <option value="bollywood">Bollywood</option>
                            <option value="hollywood">Hollywood</option>
                        </select>

                        <div className="flex justify-end">
                            <button
                                className="bg-primaryColor text-white px-4 py-2 rounded-md mr-2"
                                onClick={handleSave}
                            >
                                {loading ? "Updateing.." : "Update"}
                            </button>
                            <button
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BlogEditModal;
