import React, { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false)
    });
    return () => unsubscribe();
  }, []);

  if(loading) {
    return (
      <div className="bars">
        <Bars
          height="50"
          width="50"
          color="#50c5ec"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
      
    )
  }

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={user ? <Navigate to='/'/> : <Login />} />
          <Route path="/travelLogForm" element={<TravelLogForm />} />
          <Route path="/travelLogStats/:id" element={<TravelLogStat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/photoCard" element={<PhotoAlbum />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
