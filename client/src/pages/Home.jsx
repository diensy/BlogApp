import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoChatbubbleEllipsesSharp, IoSend } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';
import { BiLike, BiDislike, BiComment } from 'react-icons/bi';
import PostLoader from '../Components/PostLoader';
import CreatePost from '../Components/CreatePost';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [expandId, setExpandId] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'system', content: 'You are a helpful assistant.' }
  ]);
  const [commentInputs, setCommentInputs] = useState({});
  const [visibleComments, setVisibleComments] = useState({});
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // Function to get the token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };
  

  useEffect(() => {
    getPosts();
  }, [searchInput]);

  const getPosts = async () => {
    try {
      const token = getAuthToken(); 
      const response = await axios.get(`${baseUrl}/posts`, {
        params: { query: searchInput },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const formatTimeAgo = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInSec = Math.floor((now - created) / 1000);
    if (diffInSec < 60) return `${diffInSec}s ago`;
    const min = Math.floor(diffInSec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const day = Math.floor(hr / 24);
    if (day < 30) return `${day}d ago`;
    const mon = Math.floor(day / 30);
    if (mon < 12) return `${mon}mo ago`;
    return `${Math.floor(mon / 12)}y ago`;
  };

  const sendMessage = async () => {
    if (!chatInput.trim()) return;

    const updatedMessages = [...chatMessages, { role: 'user', content: chatInput }];
    setChatMessages(updatedMessages);
    setChatInput('');

    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });

      const chat = model.startChat({
        history: updatedMessages
          .filter((m) => m.role !== 'system')
          .map((m) => ({ role: m.role, parts: [{ text: m.content }] })),
      });

      const result = await chat.sendMessage(chatInput);
      const reply = result.response.text();

      setChatMessages([...updatedMessages, { role: 'model', content: reply }]);
    } catch (err) {
      console.error(err);
      setChatMessages([...updatedMessages, { role: 'model', content: 'Sorry, something went wrong.' }]);
    }
  };

  const handleLike = async (id) => {
    try {
      const token = getAuthToken();
      await axios.post(`${baseUrl}/posts/${id}/like`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(`${baseUrl}/posts/${id}/dislike`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (id) => {
    try {
      const content = commentInputs[id];
      if (!content) return;

      const token = getAuthToken();
      await axios.post(
        `${baseUrl}/posts/${id}/comment`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCommentInputs((prev) => ({ ...prev, [id]: '' }));
      getPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ height: 'auto' }}>
      <CreatePost getPosts={getPosts} />

      {/* Desktop search */}
      <div className="mt-3 p-5 fixed top-16 bg-white left-52 w-[70.5%] lg:visible invisible">
        <input
          type="text"
          placeholder="Search ..."
          className="border-b border-b-primaryColor w-full px-2 py-1 outline-none"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {loading ? (
        <PostLoader className="mt-10" />
      ) : (
        <div className="mt-20">
          {/* Mobile search */}
          <div className="pt-4 bg-white fixed top-2 w-full mt-10 lg:invisible visible">
            <input
              type="text"
              placeholder="Search ..."
              className="border-b border-b-primaryColor w-full px-2 py-1 outline-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          {posts.map((post) => (
            <div
              key={post._id}
              className="border lg:w-[70%] w-full m-auto flex flex-col justify-center my-3 p-3 lg:mt-3 mt-14"
            >
              <div className="flex items-center mb-3 gap-3">
                <div className="rounded-full w-[70px] h-[70px] overflow-hidden p-1 shadow-md">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
                    alt="user"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-[#24919B]">{post?.title}</h3>
                  <p className="text-sm text-gray-400">
                    by {post?.author?.name}{' '}
                    <span className="text-primaryColor">({post?.catagory})</span>
                  </p>
                  <p className="text-xs text-gray-400">{formatTimeAgo(post?.createdAt)}</p>
                </div>
              </div>

              {post.image && (
                <img src={post.image} alt="" className="m-auto bg-gray-300" />
              )}

              <div>
                <p>
                  {post.description.slice(0, 150)}
                  {post.description.length > 150 && (
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() =>
                        setExpandId(expandId !== post._id ? post._id : '')
                      }
                    >
                      {expandId === post._id ? ' See less...' : ' See more...'}
                    </span>
                  )}
                </p>
                {expandId === post._id && <p>{post.description.slice(150)}</p>}
              </div>

              {/* Actions */}
              <div className="flex gap-6 mt-4 text-gray-600 items-center">
                <button
                  onClick={() => handleLike(post._id)}
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <BiLike /> {post.likes?.length || 0}
                </button>
                <button
                  onClick={() => handleDislike(post._id)}
                  className="flex items-center gap-1 hover:text-red-600"
                >
                  <BiDislike /> {post.dislikes?.length || 0}
                </button>
                <button
                  onClick={() =>
                    setVisibleComments((prev) => ({
                      ...prev,
                      [post._id]: !prev[post._id],
                    }))
                  }
                  className="flex items-center gap-1 hover:text-green-600"
                >
                  <BiComment /> {post.comments?.length || 0}
                </button>
              </div>

              {/* Comments */}
              {visibleComments[post._id] && (
                <div className="mt-3 space-y-2">
                  {post.comments?.map((c, i) => (
                    <div key={i} className="bg-gray-100 p-2 rounded text-sm">
                      <strong>{c.user?.name || 'Anonymous'}:</strong> {c.content}
                    </div>
                  ))}
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      className="border flex-1 px-2 py-1 text-sm"
                      placeholder="Add a comment..."
                      value={commentInputs[post._id] || ''}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({
                          ...prev,
                          [post._id]: e.target.value,
                        }))
                      }
                    />
                    <button
                      onClick={() => handleAddComment(post._id)}
                      className="bg-primaryColor text-white px-3 py-1 text-sm rounded"
                    >
                      Post
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 🧠 Chatbot Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 mr-3 bg-[#24919B] p-3 rounded-full text-white shadow-lg hover:scale-105 duration-200"
        title="Chat with AI"
      >
        <IoChatbubbleEllipsesSharp size={20} />
      </button>

      {/* 🧠 Chat Window */}
      {showChat && (
        <div className="fixed bottom-20 right-6 w-80 max-h-[70vh] bg-white border rounded-lg shadow-xl flex flex-col overflow-hidden">
          <div className="flex justify-between items-center px-4 py-2 bg-[#10A37F] text-white">
            <p>Ask AI</p>
            <AiOutlineClose
              className="cursor-pointer"
              onClick={() => setShowChat(false)}
            />
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {chatMessages.slice(1).map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-md ${
                  msg.role === 'user'
                    ? 'bg-blue-100 self-end text-right'
                    : 'bg-gray-200 self-start'
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
          <div className="flex items-center border-t px-2 py-2">
            <input
              type="text"
              placeholder="Type something..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 outline-none text-sm px-2"
            />
            <button onClick={sendMessage} className="text-[#10A37F]">
              <IoSend size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
