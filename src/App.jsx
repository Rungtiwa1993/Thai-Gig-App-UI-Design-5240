import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import JobFeed from './screens/JobFeed';
import JobDetail from './screens/JobDetail';
import MyShifts from './screens/MyShifts';
import Wallet from './screens/Wallet';
import Profile from './screens/Profile';
import Onboarding from './screens/Onboarding';
import BottomNav from './components/BottomNav';
import TopBar from './components/TopBar';
import './App.css';

function App() {
  const [currentUser] = useState({
    name: 'สมชาย วงศ์ใหญ่',
    balance: 2850,
    rating: 4.8,
    completedJobs: 127
  });

  return (
    <Router>
      <div className="app-container">
        <div className="mobile-frame">
          <TopBar user={currentUser} />
          <Routes>
            <Route path="/" element={<HomeScreen user={currentUser} />} />
            <Route path="/jobs" element={<JobFeed />} />
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/shifts" element={<MyShifts />} />
            <Route path="/wallet" element={<Wallet user={currentUser} />} />
            <Route path="/profile" element={<Profile user={currentUser} />} />
            <Route path="/onboarding" element={<Onboarding />} />
          </Routes>
          <BottomNav />
        </div>
      </div>
    </Router>
  );
}

export default App;