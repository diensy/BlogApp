import './App.css';
import AllRoutes from './routes/AllRoutes';
import Navbar from './Components/Navbar';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const path = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App min-h-screen bg-white text-black dark:bg-slate-900 dark:text-white transition-colors duration-300">
      {
        path?.pathname === '/login' || path?.pathname === '/register' ? null : <Navbar toggleTheme={toggleTheme} theme={theme} />
      }
      <AllRoutes />
    </div>
  );
}

export default App;
