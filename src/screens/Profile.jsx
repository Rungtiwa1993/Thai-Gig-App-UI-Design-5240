import React from 'react';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiStar, FiEdit, FiFileText, FiSettings, FiHelpCircle, FiLogOut, FiChevronRight, FiShield, FiBriefcase } = FiIcons;

const Profile = ({ user }) => {
  const navigate = useNavigate();

  const skills = [
    'การเสิร์ฟอาหาร',
    'การใช้ระบบ POS',
    'ภาษาอังกฤษ',
    'การต้อนรับลูกค้า',
    'การทำงานเป็นทีม'
  ];

  const menuItems = [
    {
      icon: FiEdit,
      title: 'แก้ไขข้อมูลส่วนตัว',
      subtitle: 'ชื่อ, เบอร์โทร, ที่อยู่',
      action: () => navigate('/profile/edit')
    },
    {
      icon: FiFileText,
      title: 'เอกสารและใบรับรอง',
      subtitle: 'บัตรประชาชน, ใบรับรองการทำงาน',
      action: () => navigate('/profile/documents')
    },
    {
      icon: FiBriefcase,
      title: 'ทักษะและความสามารถ',
      subtitle: 'จัดการทักษะของคุณ',
      action: () => navigate('/profile/skills')
    },
    {
      icon: FiShield,
      title: 'ความปลอดภัยและความเป็นส่วนตัว',
      subtitle: 'รหัสผ่าน, การตั้งค่าความเป็นส่วนตัว',
      action: () => navigate('/profile/security')
    },
    {
      icon: FiSettings,
      title: 'การตั้งค่า',
      subtitle: 'การแจ้งเตือน, ภาษา',
      action: () => navigate('/profile/settings')
    },
    {
      icon: FiHelpCircle,
      title: 'ช่วยเหลือและสนับสนุน',
      subtitle: 'คำถามที่พบบ่อย, ติดต่อเรา',
      action: () => navigate('/help')
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <SafeIcon
        key={index}
        icon={FiStar}
        className={`star ${index < Math.floor(rating) ? 'filled' : 'empty'}`}
      />
    ));
  };

  return (
    <div className="screen">
      <div className="screen-content">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">โปรไฟล์</h1>
        </div>

        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <SafeIcon icon={FiUser} className="avatar-icon" />
            </div>
            <div className="profile-info">
              <h2 className="profile-name">{user.name}</h2>
              <div className="profile-rating">
                <div className="stars-container">
                  {renderStars(user.rating)}
                </div>
                <span className="rating-text">{user.rating}</span>
                <span className="jobs-count">({user.completedJobs} งาน)</span>
              </div>
            </div>
            <button className="edit-profile-btn">
              <SafeIcon icon={FiEdit} className="edit-icon" />
            </button>
          </div>

          {/* Stats */}
          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-value">{user.completedJobs}</div>
              <div className="stat-label">งานที่เสร็จสิ้น</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">{user.rating}</div>
              <div className="stat-label">คะแนนเฉลี่ย</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">98%</div>
              <div className="stat-label">อัตราการมาทำงาน</div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="skills-section">
          <h3 className="section-title">ทักษะและความสามารถ</h3>
          <div className="skills-container">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="menu-section">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="menu-item"
            >
              <div className="menu-icon-container">
                <SafeIcon icon={item.icon} className="menu-icon" />
              </div>
              <div className="menu-content">
                <h4 className="menu-title">{item.title}</h4>
                <p className="menu-subtitle">{item.subtitle}</p>
              </div>
              <SafeIcon icon={FiChevronRight} className="chevron-icon" />
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button className="logout-btn">
          <SafeIcon icon={FiLogOut} className="logout-icon" />
          ออกจากระบบ
        </button>
      </div>

      <style jsx>{`
        .profile-card {
          background-color: #ffffff;
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          border: 1px solid #f0f0f0;
        }
        
        .profile-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }
        
        .profile-avatar {
          width: 80px;
          height: 80px;
          background-color: #f5c518;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .avatar-icon {
          font-size: 36px;
          color: #000;
        }
        
        .profile-info {
          flex: 1;
        }
        
        .profile-name {
          font-size: 22px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
        }
        
        .profile-rating {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .stars-container {
          display: flex;
          gap: 2px;
        }
        
        .star {
          font-size: 16px;
        }
        
        .star.filled {
          color: #f5c518;
        }
        
        .star.empty {
          color: #e5e7eb;
        }
        
        .rating-text {
          font-weight: 600;
          color: #111827;
        }
        
        .jobs-count {
          color: #6b7280;
          font-size: 14px;
        }
        
        .edit-profile-btn {
          background-color: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .edit-profile-btn:hover {
          background-color: #f5c518;
        }
        
        .edit-icon {
          font-size: 18px;
          color: #6b7280;
        }
        
        .edit-profile-btn:hover .edit-icon {
          color: #000;
        }
        
        .profile-stats {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          align-items: center;
          text-align: center;
        }
        
        .stat-item {
          padding: 0 16px;
        }
        
        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 4px;
        }
        
        .stat-label {
          font-size: 12px;
          color: #6b7280;
        }
        
        .stat-divider {
          width: 1px;
          height: 40px;
          background-color: #e5e7eb;
        }
        
        .skills-section {
          margin-bottom: 32px;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 16px;
        }
        
        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .skill-tag {
          background-color: #f8f9fa;
          color: #374151;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          border: 1px solid #e5e7eb;
        }
        
        .menu-section {
          margin-bottom: 32px;
        }
        
        .menu-item {
          width: 100%;
          background-color: #ffffff;
          border: 1px solid #f0f0f0;
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }
        
        .menu-item:hover {
          background-color: #f8f9fa;
          transform: translateY(-1px);
        }
        
        .menu-icon-container {
          width: 44px;
          height: 44px;
          background-color: #f8f9fa;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .menu-icon {
          font-size: 20px;
          color: #6b7280;
        }
        
        .menu-content {
          flex: 1;
        }
        
        .menu-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 4px;
        }
        
        .menu-subtitle {
          font-size: 14px;
          color: #6b7280;
        }
        
        .chevron-icon {
          font-size: 18px;
          color: #9ca3af;
        }
        
        .logout-btn {
          width: 100%;
          background-color: #fee2e2;
          color: #dc2626;
          border: 1px solid #fecaca;
          border-radius: 16px;
          padding: 16px 24px;
          font-family: 'Sukhumvit Set', sans-serif;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .logout-btn:hover {
          background-color: #fecaca;
        }
        
        .logout-icon {
          font-size: 18px;
        }
      `}</style>
    </div>
  );
};

export default Profile;