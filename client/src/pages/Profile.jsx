import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import AreYouSureModal from '../Components/AreYouSureModal';
import BlogEditModal from '../Components/BlogEditModal';
import CreatePost from '../Components/CreatePost';
import UserPostLoader from '../Components/UserPostLoader';
import ProfileEdit from '../Components/ProfileEdit';
import toast, { Toaster } from 'react-hot-toast';
import { FcInfo } from "react-icons/fc";

export default function Profile() {
    const [posts, setPosts] = useState([]);
    const [deletePostId, setDeletePostId] = useState(null);
    const token = localStorage.getItem('token');
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [editPostId, setEditPostId] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = async () => {
        await axios.get(`${baseUrl}/get-user-by-id/${user?._id}`)
            .then((res) => setUser(res?.data?.user))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        setLoading(true)
        try {
            const response = await axios.get(baseUrl + `/user-post/${user._id}`);
            setLoading(false)
            setPosts(response.data);
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    };

    const HandleDelete = (id) => {
        setDeletePostId(id);
    };

    const confirmDelete = async () => {
        const headers = {
            'Authorization': token
        };
        try {
            await axios.delete(baseUrl + `/posts/${deletePostId}`, { headers })
                .then(res => {
                    if (res.status) {
                        getPosts()
                        toast.success(res?.data?.message, { position: "top-right" });
                    } else {
                        toast.error("Something went wrong", { position: "top-right" });
                    }
                })
                .catch(err => {
                    toast.error("Something went wrong", { position: "top-right" });

                })


        } catch (error) {
            console.log(error);
        }
    };

    const cancelDelete = () => {
        setDeletePostId(null);
    };


    const HandleEdit = (id) => {
        setEditPostId(id);
    };


    const cancelEdit = () => {
        setEditPostId(null);
    };

    const styles = {
        Label: "block text-sm font-semibold text-gray-600",
        UserData: "text-sm text-gray-800"
    }

    return (
        <div className='flex gap-4' >
            <Toaster />
            <CreatePost getPosts={getPosts} />
            <AreYouSureModal
                isOpen={deletePostId !== null}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                title='Are you sure you want to delete this post?'
            />
            <BlogEditModal
                isOpen={editPostId !== null}
                onClose={cancelEdit}
                BlogId={editPostId}
                getPosts={getPosts}
            />
            <div className='lg:flex gap-3' >
                <div className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4 lg:w-[30%] z-0 w-full lg:sticky top-20 border lg:mt-4">
                    <div className='mb-4 flex gap-4 items-center border p-2 rounded-lg shadow-lg'>
                        <div className='w-[150px] h-[150px] overflow-hidden border rounded-full p-3 shadow-lg'>
                            <img src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/147/147142.png"} alt="" className='w-[100%] h-[100%]' />
                        </div>
                        <div>
                            <div className="mb-4">
                                <label className={styles.Label}>Name:</label>
                                <p className={styles.UserData}>{user.name}</p>
                            </div>
                            <div className="mb-4">
                                <label className={styles.Label}>Email:</label>
                                <p className={styles.UserData}>{user.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 mb-4 border p-2 rounded-lg shadow-lg">

                        <div className="mb-4">
                            <label className={styles.Label}>Gender:</label>
                            <p className={styles.UserData}>{user.gender}</p>
                        </div>
                        <div className="mb-4">
                            <label className={styles.Label}>Date of Birth:</label>
                            <p className={styles.UserData}>{user.dateOfBirth}</p>
                        </div>
                        <div className="mb-4">
                            <label className={styles.Label}>Phone Number:</label>
                            <p className={styles.UserData}>{user.phoneNumber}</p>
                        </div>
                        <div className="mb-4">
                            <label className={styles.Label}>Created At:</label>
                            <p className={styles.UserData}>{user.createdAt}</p>
                        </div>
                        <div className="mb-4">
                            <label className={styles.Label}>Updated At:</label>
                            <p className={styles.UserData}>{user.updatedAt}</p>
                        </div>
                        <div className='flex justify-end p-4' >
                            <ProfileEdit getUserData={getUserData} />

                        </div>
                    </div>
                </div>

                {
                    loading ?

                        <UserPostLoader /> :

                        <div className='border lg:w-[70%] w-full overflow-y-auto h-[85vh] p-4 shadow-md grid lg:grid-cols-3 grid-cols-1 gap-4 lg:mt-4 rounded'>
                            {posts &&
                                posts.map((ele) => (
                                    <div className='border p-4 h-[310px] rounded-xl shadow-lg' key={ele._id}>
                                        <div >
                                            {
                                                ele?.image == '' ?
                                                    <div className='h-[250px] overflow-y-auto register-form' >
                                                        <p>{ele?.description}</p>
                                                    </div> :
                                                    ele?.image && < img src={ele?.image} alt={ele.title} className='m-auto h-[250px] rounded-t-lg' />
                                            }
                                        </div>
                                        <div className='flex items-center mt-1 h-[30px] justify-between '>
                                            <h3 className='font-bold text-gray-500 '>
                                                {ele?.title.length > 25 ? `${ele?.title.substring(0, 25)}...` : ele?.title}
                                            </h3>

                                            <div className='flex gap-2'>
                                                <CiEdit size={20} className='cursor-pointer text-primaryColor' onClick={() => HandleEdit(ele)} />
                                                <MdDeleteForever onClick={() => HandleDelete(ele?._id)} size={20} className='cursor-pointer text-primaryColor hover:text-red-500' />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            {
                                posts.length == 0 &&

                                <div className='lg:w-[780px] w-[300px]' >
                                    <h2 className='text-center font-bold text-gray-400 mt-16' >No blogs</h2>
                                </div>
                            }


                        </div>
                }


            </div>


        </div>
    )
}
