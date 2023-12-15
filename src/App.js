// App.js

// new update
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/NavBar/NavBar.jsx';
import Sidebar from './components/common/Sidebar/Sidebar.jsx';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import ContactUs from './components/pages/ContactUs.js';
import Footer from './components/common/Footer/Footer.jsx';

import Actor from "./components/actor/Actor.js";

import Login from './components/auth/Login';
import Logout from './components/auth/Logout';

import Signup from './components/auth/Signup';
// import ChatBot from './components/pages/ChatBot';


import './App.css';
import AboutUs from './components/pages/AboutUs';
import NewsletterForm from './components/Newsletterform/Newsletterform.js';
import MovieDetails from './components/pages/Moviedetails.js';

function App() {
  const routes = [
    { path: '/', text: 'Home' },
    { path: '/login', text: 'Login' },
    { path: '/dashboard', text: 'Dashboard' },
    { path: '/about', text: 'About' },
    { path: '/contactus', text: 'Contact' },

    // Add more routes as needed
  ];
  return (
    <Router>
      <div className="App">
        <Sidebar routes={routes} />
        {/* Include the Sidebar component here */}

        <div className="main-content">
          {' '}
          {/* Use main-content as the class name */}
          <Navbar className="mb10" />
          <Routes>
            <Route
              path="/"
              element={
                <React.Fragment>
                  <Home />
                  <NewsletterForm />
                </React.Fragment>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/movie/:movieId" element={<MovieDetails />} />
            <Route path="/artist/:artistId" element={<Actor />} />
            {/* Add more routes for other pages */}
          </Routes>
          {/* <ChatBot></ChatBot> */}
          <Footer/>
        </div>
        
      </div>
    </Router>
  );
}

export default App;
