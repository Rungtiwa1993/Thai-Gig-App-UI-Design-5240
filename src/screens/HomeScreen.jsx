import React from 'react';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiStar, FiCalendar, FiCreditCard, FiBell } = FiIcons;

const HomeScreen = ({ user }) => {
  const navigate = useNavigate();

  const quickActions = [
    { title: 'งานของฉัน', icon: FiCalendar, path: '/shifts', color: '#f5c518' },
    { title: 'กระเป๋าเงิน', icon: FiCreditCard, path: '/wallet', color: '#f5c518' },
    { title: 'แจ้งเตือน', icon: FiBell, path: '/notifications', color: '#f5c518' }
  ];

  const featuredJobs = [
    {
      id: 1,
      title: 'พนักงานเสิร์ฟ',
      company: 'ร้านอาหารญี่ปุ่น',
      rate: '฿180/ชม.',
      location: 'สยาม',
      date: 'วันนี้'
    },
    {
      id: 2,
      title: 'แคชเชียร์',
      company: 'ซูเปอร์มาร์เก็ต',
      rate: '฿160/ชม.',
      location: 'อโศก',
      date: 'พรุ่งนี้'
    }
  ];

  return (
    <div className="screen">
      <div className="screen-content">
        {/* Welcome Message */}
        <div className="welcome-message">
          <h2 className="welcome-text">
            สวัสดี <span className="user-name">{user.name.split(' ')[0]}</span> 👋
          </h2>
          <p className="welcome-subtitle">พร้อมทำงานวันนี้หรือยัง?</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-container mb-6">
          <div className="stat-card">
            <SafeIcon icon={FiTrendingUp} className="text-2xl brand-yellow mb-2" />
            <p className="text-3xl font-bold text-gray-900">฿{user.balance.toLocaleString()}</p>
            <p className="text-sm text-gray-500">รายได้เดือนนี้</p>
          </div>
          <div className="stat-card">
            <SafeIcon icon={FiStar} className="text-2xl brand-yellow mb-2" />
            <p className="text-3xl font-bold text-gray-900">{user.rating}</p>
            <p className="text-sm text-gray-500">คะแนนเฉลี่ย</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">เข้าถึงด่วน</h2>
          <div className="quick-actions">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className="quick-action-btn"
              >
                <SafeIcon icon={action.icon} className="text-2xl brand-yellow mb-2" />
                <span className="text-sm font-medium text-gray-700">{action.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Jobs */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">งานแนะนำ</h2>
            <button 
              onClick={() => navigate('/jobs')}
              className="text-sm brand-yellow font-semibold"
            >
              ดูทั้งหมด
            </button>
          </div>
          
          <div className="job-carousel">
            {featuredJobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
                  <p className="text-sm text-gray-500">{job.company}</p>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold brand-yellow">{job.rate}</span>
                  <span className="text-sm text-gray-500">{job.location} • {job.date}</span>
                </div>
                <button 
                  onClick={() => navigate(`/job/${job.id}`)}
                  className="btn-primary"
                >
                  สมัครงาน
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .welcome-message {
          margin-bottom: 24px;
          padding-top: 4px;
        }
        
        .welcome-text {
          font-size: 24px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 4px;
        }
        
        .user-name {
          color: #f5c518;
        }
        
        .welcome-subtitle {
          font-size: 16px;
          color: #6b7280;
        }

        .notification-btn {
          position: relative;
          background: none;
          border: none;
          padding: 8px;
          border-radius: 12px;
          background-color: #f8f9fa;
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
        
        .stats-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        
        .stat-card {
          background-color: #ffffff;
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          border: 1px solid #f0f0f0;
        }
        
        .quick-actions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        
        .quick-action-btn {
          background-color: #ffffff;
          border: 1px solid #f0f0f0;
          border-radius: 16px;
          padding: 20px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        
        .quick-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }
        
        .job-carousel {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding-bottom: 8px;
        }
        
        .job-card {
          background-color: #ffffff;
          border-radius: 16px;
          padding: 20px;
          min-width: 280px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          border: 1px solid #f0f0f0;
        }
        
        .brand-yellow {
          color: #f5c518;
        }
      `}</style>
    </div>
  );
};

export default HomeScreen;