import logo from './logo.svg';
import './App.css';
import AllRoutes from './routes/AllRoutes';
import Navbar from './Components/Navbar';
import { useLocation } from 'react-router-dom';

function App() {
  const path = useLocation()
  return (
    <div className="App">
      {
        path?.pathname === '/login' || path?.pathname === '/register' ? "" :
          <Navbar />
      }
      <AllRoutes />
    </div>
  );
}

export default App;
