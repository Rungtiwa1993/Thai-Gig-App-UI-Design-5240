import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiBell, FiMenu, FiX } = FiIcons;

const TopBar = ({ title, showBack = false, showNotification = true, user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getPageTitle = () => {
    if (title) return title;
    
    switch (location.pathname) {
      case '/':
        return 'หน้าแรก';
      case '/jobs':
        return 'หางาน';
      case '/shifts':
        return 'กะของฉัน';
      case '/wallet':
        return 'กระเป๋าเงิน';
      case '/profile':
        return 'โปรไฟล์';
      default:
        if (location.pathname.startsWith('/job/')) {
          return 'รายละเอียดงาน';
        }
        return '';
    }
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          {showBack ? (
            <button onClick={handleBackClick} className="back-btn">
              <SafeIcon icon={FiArrowLeft} className="icon" />
            </button>
          ) : (
            <button onClick={toggleMenu} className="menu-btn">
              <SafeIcon icon={FiMenu} className="icon" />
            </button>
          )}
        </div>
        
        <div className="topbar-center">
          <h1 className="page-title">{getPageTitle()}</h1>
        </div>
        
        <div className="topbar-right">
          {showNotification && (
            <button className="notification-btn">
              <SafeIcon icon={FiBell} className="icon" />
              <span className="notification-badge"></span>
            </button>
          )}
        </div>
      </div>
      
      {/* Side Menu */}
      {isMenuOpen && (
        <div className="side-menu-overlay" onClick={toggleMenu}>
          <div className="side-menu" onClick={(e) => e.stopPropagation()}>
            <div className="side-menu-header">
              <button onClick={toggleMenu} className="close-btn">
                <SafeIcon icon={FiX} className="icon" />
              </button>
              <div className="user-info">
                <div className="user-avatar">
                  {user?.name.charAt(0) || 'U'}
                </div>
                <div className="user-details">
                  <h3 className="user-name">{user?.name || 'ผู้ใช้งาน'}</h3>
                  <p className="user-rating">⭐ {user?.rating || '0.0'} ({user?.completedJobs || '0'} งาน)</p>
                </div>
              </div>
            </div>
            
            <div className="side-menu-items">
              <button 
                onClick={() => {
                  navigate('/');
                  toggleMenu();
                }}
                className={`menu-item ${location.pathname === '/' ? 'active' : ''}`}
              >
                หน้าแรก
              </button>
              <button 
                onClick={() => {
                  navigate('/jobs');
                  toggleMenu();
                }}
                className={`menu-item ${location.pathname === '/jobs' ? 'active' : ''}`}
              >
                หางาน
              </button>
              <button 
                onClick={() => {
                  navigate('/shifts');
                  toggleMenu();
                }}
                className={`menu-item ${location.pathname === '/shifts' ? 'active' : ''}`}
              >
                กะของฉัน
              </button>
              <button 
                onClick={() => {
                  navigate('/wallet');
                  toggleMenu();
                }}
                className={`menu-item ${location.pathname === '/wallet' ? 'active' : ''}`}
              >
                กระเป๋าเงิน
              </button>
              <button 
                onClick={() => {
                  navigate('/profile');
                  toggleMenu();
                }}
                className={`menu-item ${location.pathname === '/profile' ? 'active' : ''}`}
              >
                โปรไฟล์
              </button>
              <div className="menu-divider"></div>
              <button 
                onClick={() => {
                  navigate('/help');
                  toggleMenu();
                }}
                className="menu-item"
              >
                ช่วยเหลือ
              </button>
              <button 
                onClick={() => {
                  // Logout functionality would go here
                  toggleMenu();
                }}
                className="menu-item logout"
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .topbar {
          height: 64px;
          width: 100%;
          background-color: #ffffff;
          border-bottom: 1px solid #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .topbar-left, .topbar-right {
          width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .topbar-center {
          flex: 1;
          text-align: center;
        }
        
        .page-title {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }
        
        .back-btn, .menu-btn, .notification-btn {
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
          border-radius: 8px;
          transition: background-color 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .back-btn:hover, .menu-btn:hover, .notification-btn:hover {
          background-color: #f8f9fa;
        }
        
        .icon {
          font-size: 20px;
          color: #374151;
        }
        
        .notification-btn {
          position: relative;
        }
        
        .notification-badge {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 8px;
          height: 8px;
          background-color: #f5c518;
          border-radius: 50%;
        }
        
        /* Side Menu Styles */
        .side-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          display: flex;
        }
        
        .side-menu {
          width: 280px;
          height: 100%;
          background-color: #ffffff;
          box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .side-menu-header {
          padding: 20px;
          border-bottom: 1px solid #f0f0f0;
          position: relative;
        }
        
        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .user-info {
          display: flex;
          align-items: center;
          margin-top: 16px;
        }
        
        .user-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #f5c518;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 600;
          color: #000000;
          margin-right: 16px;
        }
        
        .user-name {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 4px 0;
        }
        
        .user-rating {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }
        
        .side-menu-items {
          flex: 1;
          overflow-y: auto;
          padding: 16px 0;
        }
        
        .menu-item {
          display: block;
          width: 100%;
          padding: 16px 24px;
          text-align: left;
          background: none;
          border: none;
          font-family: 'Sukhumvit Set', sans-serif;
          font-size: 16px;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .menu-item:hover {
          background-color: #f8f9fa;
        }
        
        .menu-item.active {
          background-color: #fff8e1;
          color: #f5c518;
          font-weight: 600;
          border-left: 3px solid #f5c518;
        }
        
        .menu-divider {
          height: 1px;
          background-color: #f0f0f0;
          margin: 16px 0;
        }
        
        .menu-item.logout {
          color: #dc2626;
        }
      `}</style>
    </>
  );
};

export default TopBar;