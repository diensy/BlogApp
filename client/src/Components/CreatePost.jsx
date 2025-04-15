import React, { useState } from "react";
import axios from "axios";
import { IoAdd } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { FcInfo } from "react-icons/fc";
import { useDropzone } from "react-dropzone";

export default function CreatePost({ getPosts }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [catagory, setCatagory] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setshowForm] = useState(false);

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const CLOUD_NAME = "dxajy8moa";
  const UPLOAD_PRESET = "dinesh_preset";

  const onDrop = (acceptedFiles) => {
    const uploaded = acceptedFiles[0];
    setFile(uploaded);
    setPreview(URL.createObjectURL(uploaded));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !description || !catagory) {
      toast("Please fill all fields", {
        icon: <FcInfo />,
        position: "top-right",
      });
      return;
    }

    setLoading(true);

    try {
      let imageUrl = "";

      if (file) {
        const imageData = new FormData();
        imageData.append("file", file);
        imageData.append("upload_preset", UPLOAD_PRESET);

        const cloudRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          imageData
        );
        imageUrl = cloudRes.data.secure_url;
      }

      const payload = {
        title,
        description,
        image: imageUrl,
        catagory,
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `${token}`,
      };

      const res = await axios.post(baseUrl + "/posts", payload, { headers });

      if (res.data.postId) {
        setshowForm(false);
        getPosts();
        toast.success(res?.data?.message, { position: "top-right" });
        setTitle("");
        setDescription("");
        setFile(null);
        setPreview(null);
        setCatagory("");
      } else {
        toast.error("Something went wrong", { position: "top-right" });
      }
    } catch (err) {
      toast.error("Failed to create post", { position: "top-right" });
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div>
      <Toaster />
      {showForm && (
        <div className="fixed inset-0 pt-20 bg-[#000000a6] z-[100] overflow-y-auto">
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white dark:bg-slate-800 text-black dark:text-white shadow-md rounded px-8 pt-6 pb-8 max-h-[90vh] overflow-y-auto transition-colors duration-300"
          >
            <div className="flex justify-end">
              <span
                className="text-lg cursor-pointer w-7 h-7 flex justify-center items-center text-gray-500 dark:text-gray-300"
                onClick={() => setshowForm(false)}
              >
                x
              </span>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-white">
                Title:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-primaryColor bg-white dark:bg-slate-700 dark:text-white"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-white">
                Image:
              </label>
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-gray-400 dark:border-gray-600 p-4 rounded-md text-center cursor-pointer bg-white dark:bg-slate-700 relative h-64 overflow-hidden"
              >
                <input {...getInputProps()} />
                {preview ? (
                  <div className="overflow-auto h-full">
                    <img
                      src={preview}
                      alt="Preview"
                      className="object-contain max-h-60 mx-auto"
                    />
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-300">
                    {isDragActive
                      ? "Drop the image here..."
                      : "Drag and drop or click to upload image"}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-white">
                Description:
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-primaryColor bg-white dark:bg-slate-700 dark:text-white"
                rows={5}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <select
              className="border rounded-md p-2 w-full mb-4 focus:outline-none focus:border-primaryColor bg-white dark:bg-slate-700 dark:text-white"
              onChange={(e) => setCatagory(e.target.value)}
              value={catagory}
            >
              <option value="">Choose Category</option>
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
              type="submit"
              disabled={loading}
              className={`bg-[#24919B] hover:bg-gray-500 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline ${
                loading && "cursor-progress"
              }`}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </form>
        </div>
      )}

      {!showForm && (
        <button
          onClick={() => setshowForm(true)}
          className="border bg-[#24919B] text-white fixed bottom-20 right-10 rounded-full shadow-md"
        >
          <IoAdd className="h-10 w-10" />
        </button>
      )}
    </div>
  );
}
