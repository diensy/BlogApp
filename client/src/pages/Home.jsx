import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { LuMessageCircle } from 'react-icons/lu';
import { IoAdd, IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import PostLoader from '../Components/PostLoader';
import CreatePost from '../Components/CreatePost';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [expandId, setExpandId] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    getPosts();
  }, [searchInput]);
  const getPosts = async () => {
    try {
      const response = await axios.get(baseUrl + '/posts', {
        params: { query: searchInput }
      });
      setPosts(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  function formatTimeAgo(createdAt) {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);
    const timeDifferenceInSeconds = Math.floor((currentDate - createdDate) / 1000);

    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} second${timeDifferenceInSeconds === 1 ? '' : 's'} ago`;
    }

    const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
    if (timeDifferenceInMinutes < 60) {
      return `${timeDifferenceInMinutes} minute${timeDifferenceInMinutes === 1 ? '' : 's'} ago`;
    }

    const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
    if (timeDifferenceInHours < 24) {
      return `${timeDifferenceInHours} hour${timeDifferenceInHours === 1 ? '' : 's'} ago`;
    }

    const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
    if (timeDifferenceInDays < 30) {
      return `${timeDifferenceInDays} day${timeDifferenceInDays === 1 ? '' : 's'} ago`;
    }

    const timeDifferenceInMonths = Math.floor(timeDifferenceInDays / 30);
    if (timeDifferenceInMonths < 12) {
      return `${timeDifferenceInMonths} month${timeDifferenceInMonths === 1 ? '' : 's'} ago`;
    }

    const timeDifferenceInYears = Math.floor(timeDifferenceInMonths / 12);
    return `${timeDifferenceInYears} year${timeDifferenceInYears === 1 ? '' : 's'} ago`;
  }

  function displayTimeAgo(createdAt) {
    return formatTimeAgo(createdAt);
  }




  return (
    <div style={{height:'auto'}}>
      <CreatePost getPosts={getPosts} />
      <div className="mt-3 p-5 fixed  top-16 bg-white left-52 w-[70.5%] lg:visible invisible ">
        <input
          type="text"
          placeholder="Search ..."
          className="border-b border-b-primaryColor w-[100%] px-2 py-1 outline-none"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      {loading ? (
        <PostLoader className="mt-10"/>
      ) : (
        <div className='mt-20'>

          <div className="pt-4 bg-white fixed top-2 w-full  mt-10 lg:invisible visible ">
            <input
              type="text"
              placeholder="Search ..."
              className="border-b border-b-primaryColor w-[100%] px-2  py-1 outline-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          {posts &&
            posts.map((ele) => (
              <div className="border lg:w-[70%] w-full m-auto flex flex-col justify-center my-3 p-3 lg:mt-3 mt-14" key={ele._id}>
                <div className='flex items-center mb-3 gap-3' >
                  <div className='rounded-full w-[70px] h-[70px] overflow-hidden p-1 shadow-md' >
                    <img src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="user" />
                  </div>
                  <div>
                    <h3 className='font-bold text-[#24919B]' >{ele?.title}</h3>
                    <p className='text-sm text-gray-400'>by {ele?.author?.name} <span className='text-primaryColor' >( {ele?.catagory} )</span> </p>
                    <p className='text-xs text-gray-400'>{displayTimeAgo(ele?.createdAt)}</p>

                  </div>
                </div>
                <div className='bg-gray-300' >{ele.image && <img src={ele.image} alt="" className="m-auto" />}</div>
                <div>
                  <p>
                    {ele.description.slice(0, 150)}
                    {ele.description.length > 150 && (
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => {
                          if (expandId !== ele._id) {
                            setExpandId(ele._id);
                          } else {
                            setExpandId('');
                          }
                        }}
                      >
                        {ele._id === expandId ? ' See less...' : ' See more...'}
                      </span>
                    )}
                  </p>
                  {ele._id === expandId && <p>{ele.description.slice(150)}</p>}
                </div>
               
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
