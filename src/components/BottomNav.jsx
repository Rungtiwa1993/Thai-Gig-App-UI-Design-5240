import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiSearch, FiCalendar, FiCreditCard, FiUser } = FiIcons;

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: FiHome, label: 'หน้าแรก' },
    { path: '/jobs', icon: FiSearch, label: 'หางาน' },
    { path: '/shifts', icon: FiCalendar, label: 'กะของฉัน' },
    { path: '/wallet', icon: FiCreditCard, label: 'กระเป๋าเงิน' },
    { path: '/profile', icon: FiUser, label: 'โปรไฟล์' }
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`nav-item ${isActive ? 'active' : ''}`}
          >
            <SafeIcon 
              icon={item.icon} 
              className={`nav-icon ${isActive ? 'text-brand-yellow' : 'text-gray-400'}`}
            />
            <span className={`nav-label ${isActive ? 'text-brand-yellow font-semibold' : 'text-gray-400'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
      <style jsx>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 375px;
          height: 80px;
          background-color: #ffffff;
          border-top: 1px solid #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 16px;
          z-index: 1000;
        }
        
        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px 4px;
          transition: all 0.2s ease;
          min-width: 60px;
        }
        
        .nav-icon {
          font-size: 22px;
          margin-bottom: 4px;
        }
        
        .nav-label {
          font-size: 11px;
          font-family: 'Sukhumvit Set', sans-serif;
          font-weight: 500;
        }
        
        .text-brand-yellow {
          color: #f5c518;
        }
        
        .text-gray-400 {
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default BottomNav;