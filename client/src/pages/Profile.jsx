import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import AreYouSureModal from "../Components/AreYouSureModal";
import BlogEditModal from "../Components/BlogEditModal";
import CreatePost from "../Components/CreatePost";
import UserPostLoader from "../Components/UserPostLoader";
import ProfileEdit from "../Components/ProfileEdit";
import toast, { Toaster } from "react-hot-toast";
import { FcInfo } from "react-icons/fc";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [deletePostId, setDeletePostId] = useState(null);
  const [editPostId, setEditPostId] = useState(null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const token = localStorage.getItem("token");
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    getUserData();
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    getPosts();
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const getUserData = async () => {
    await axios
      .get(`${baseUrl}/get-user-by-id/${user?._id}`)
      .then((res) => setUser(res?.data?.user))
      .catch((err) => console.log(err));
  };

  const getPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(baseUrl + `/user-post/${user._id}`);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const HandleDelete = (id) => {
    setDeletePostId(id);
  };

  const confirmDelete = async () => {
    const headers = { Authorization: token };
    try {
      const res = await axios.delete(baseUrl + `/posts/${deletePostId}`, {
        headers,
      });
      if (res.status) {
        getPosts();
        toast.success(res?.data?.message, { position: "top-right" });
      } else {
        toast.error("Something went wrong", { position: "top-right" });
      }
    } catch (err) {
      toast.error("Something went wrong", { position: "top-right" });
    }
  };

  const cancelDelete = () => setDeletePostId(null);
  const HandleEdit = (id) => setEditPostId(id);
  const cancelEdit = () => setEditPostId(null);

  const styles = {
    Label: "block text-sm font-semibold text-gray-600 dark:text-gray-300",
    UserData: "text-sm text-gray-800 dark:text-gray-200",
  };

  return (
    <div className="flex gap-4 dark:bg-gray-900 min-h-screen p-4 transition-all">
      <Toaster />
      <CreatePost getPosts={getPosts} />
      <AreYouSureModal
        isOpen={deletePostId !== null}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        title="Are you sure you want to delete this post?"
      />
      <BlogEditModal
        isOpen={editPostId !== null}
        onClose={cancelEdit}
        BlogId={editPostId}
        getPosts={getPosts}
      />
      <div className="lg:flex gap-3 w-full">
        {/* Left Panel */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded px-4 pt-6 pb-8 mb-4 lg:w-[30%] w-full border lg:sticky top-20 z-0 lg:mt-4">
          <div className="mb-4 flex gap-4 items-center border dark:border-gray-600 p-2 rounded-lg shadow-lg">
            <div className="w-[150px] h-[150px] overflow-hidden border dark:border-gray-600 rounded-full p-3 shadow-lg">
              <img
                src={
                  user?.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/147/147142.png"
                }
                alt=""
                className="w-[100%] h-[100%]"
              />
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
          <div className="grid grid-cols-2 gap-x-4 mb-4 border dark:border-gray-600 p-2 rounded-lg shadow-lg">
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
            <div className="flex justify-end p-4">
              <ProfileEdit getUserData={getUserData} />
            </div>
          </div>

          {/* <button
            onClick={toggleDarkMode}
            className="mt-4 bg-primaryColor hover:bg-blue-600 text-white py-2 px-4 rounded transition"
          >
            Toggle {darkMode ? "Light" : "Dark"} Mode
          </button> */}
        </div>

        {/* Posts Section */}
        {loading ? (
          <UserPostLoader />
        ) : (
          <div className="border dark:border-gray-600 lg:w-[70%] w-full overflow-y-auto h-[85vh] p-4 shadow-md grid lg:grid-cols-3 grid-cols-1 gap-4 lg:mt-4 rounded">
            {posts.length > 0 ? (
              posts.map((ele) => (
                <div
                  className="border dark:border-gray-600 dark:bg-gray-800 p-4 h-[310px] rounded-xl shadow-lg"
                  key={ele._id}
                >
                  <div>
                    {ele?.image === "" ? (
                      <div className="h-[250px] overflow-y-auto register-form text-gray-800 dark:text-gray-300">
                        <p>{ele?.description}</p>
                      </div>
                    ) : (
                      <img
                        src={ele?.image}
                        alt={ele.title}
                        className="m-auto h-[250px] rounded-t-lg"
                      />
                    )}
                  </div>
                  <div className="flex items-center mt-1 h-[30px] justify-between">
                    <h3 className="font-bold text-gray-600 dark:text-gray-200">
                      {ele?.title.length > 25
                        ? `${ele?.title.substring(0, 25)}...`
                        : ele?.title}
                    </h3>
                    <div className="flex gap-2">
                      <CiEdit
                        size={20}
                        className="cursor-pointer text-primaryColor"
                        onClick={() => HandleEdit(ele)}
                      />
                      <MdDeleteForever
                        onClick={() => HandleDelete(ele?._id)}
                        size={20}
                        className="cursor-pointer text-primaryColor hover:text-red-500"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="lg:w-[780px] w-[300px]">
                <h2 className="text-center font-bold text-gray-400 mt-16">
                  No blogs
                </h2>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
