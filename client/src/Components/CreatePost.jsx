import React, { useState } from 'react';
import axios from 'axios';
import { IoAdd } from 'react-icons/io5';
import toast, { Toaster } from 'react-hot-toast';
import { FcInfo } from "react-icons/fc";

export default function CreatePost({ getPosts }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [catagory, setCatagory] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false)

    const [showForm, setshowForm] = useState(false)

    const baseUrl = process.env.REACT_APP_BASE_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (title == '' || description === '' || catagory === '') {
            toast('Please fill all title , description and category', {
                icon: <FcInfo />,
                position: "top-right"
            });

        } else {
            setLoading(true)
            const payload = {
                title,
                description,
                image,
                catagory
            };


            const token = localStorage.getItem('token');

            const headers = {
                'Authorization': `${token}`
            };

            await axios
                .post(baseUrl + '/posts', payload, { headers })
                .then((res) => {
                    if (res.data.postId) {
                        setshowForm(false)
                        getPosts()
                        toast.success(res?.data?.message, { position: "top-right" });
                        setTitle('');
                        setDescription('');
                        setImage('');
                        setCatagory('')
                    } else {
                        toast.error("Something went wrong", { position: "top-right" });
                    }
                    setLoading(false)
                })
                .catch(() => {
                    setLoading(false)
                    toast.error("Something went wrong", { position: "top-right" });
                })
                .finally(() => setLoading(false))
        }


    };

    const styles = {
        Input: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primaryColor",
        Submit: `bg-[#24919B] hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${loading && 'cursor-progress'} `,
        Label: "block text-gray-700 text-sm font-bold mb-2",
        Form: "max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 "
    }

    return (
        <div>
            <Toaster />
            {
                showForm &&
                <div className='border fixed w-full top-0 bottom-0 pt-20 bg-[#80808098] z-[100]' >
                    <form onSubmit={handleSubmit} className={styles.Form}>
                        <div className='flex justify-end'  >
                            <span className='text-lg cursor-pointer w-7 h-7 flex justify-center items-center text-gray-500 ' onClick={() => setshowForm(false)} >x</span>
                        </div>
                        <div className="mb-4">
                            <label className={styles.Label} htmlFor="title">
                                Title:
                            </label>
                            <input
                                className={styles.Input}
                                id="title"
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className={styles.Label} htmlFor="image">
                                Image:
                            </label>
                            <input
                                className={styles.Input}
                                id="image"
                                type="text"
                                placeholder="Image URL"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className={styles.Label} htmlFor="description">
                                Description:
                            </label>
                            <textarea

                                className={styles.Input}
                                rows={5}
                                id="description"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <select name="" id=""
                            className='border rounded-md p-2 w-full mb-4 focus:outline-none focus:border-primaryColor'
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

                        <button
                            className={styles.Submit}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create'}
                        </button>
                    </form>
                </div>
            }

            {
                !showForm &&
                <button onClick={() => setshowForm(!showForm)} className="border bg-[#24919B] text-white fixed bottom-20 right-10 rounded-full">
                    <IoAdd className="h-10 w-10" />
                </button>
            }

        </div>

    );




}


