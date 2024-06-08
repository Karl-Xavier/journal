import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebaseConfig';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import Profile from './pages/Profile/Profile';
import TravelLogForm from './components/TravelLog/TravelLogForm';
import TravelLogStat from './components/TravelLog/TravelLogStat';
import PhotoAlbum from './pages/Gallery/PhotoAlbum';
import Gallery from './pages/Gallery/Gallery';
import NotFound from './pages/NotFound/NotFound';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/travelLogForm" element={user ? <TravelLogForm /> : <Navigate to="/login" />} />
          <Route path="/travelLogStats/:id" element={user ? <TravelLogStat /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/photoCard" element={user ? <PhotoAlbum /> : <Navigate to="/login" />} />
          <Route path="/gallery" element={user ? <Gallery /> : <Navigate to="/login" />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
