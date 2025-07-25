import React, { useState } from 'react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiClock, FiMapPin, FiCheck, FiAlertCircle, FiStar } = FiIcons;

const MyShifts = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingShifts = [
    {
      id: 1,
      title: 'พนักงานเสิร์ฟ',
      company: 'ร้านอาหารญี่ปุ่น ซากุระ',
      date: 'วันนี้',
      time: '18:00 - 22:00',
      location: 'สยาม',
      rate: '฿180/ชม.',
      status: 'confirmed',
      statusText: 'ยืนยันแล้ว'
    },
    {
      id: 2,
      title: 'แคชเชียร์',
      company: 'ซูเปอร์มาร์เก็ต',
      date: 'พรุ่งนี้',
      time: '09:00 - 17:00',
      location: 'อโศก',
      rate: '฿160/ชม.',
      status: 'pending',
      statusText: 'รออนุมัติ'
    },
    {
      id: 3,
      title: 'บาริสต้า',
      company: 'คาเฟ่ อเมซอน',
      date: '27 ม.ค.',
      time: '07:00 - 15:00',
      location: 'ชิดลม',
      rate: '฿170/ชม.',
      status: 'confirmed',
      statusText: 'ยืนยันแล้ว'
    }
  ];

  const completedShifts = [
    {
      id: 4,
      title: 'พนักงานต้อนรับ',
      company: 'โรงแรม แกรนด์',
      date: '23 ม.ค.',
      time: '14:00 - 22:00',
      location: 'สีลม',
      rate: '฿200/ชม.',
      earned: '฿1,600',
      rating: 5,
      status: 'completed'
    },
    {
      id: 5,
      title: 'พนักงานจัดเรียงสินค้า',
      company: 'โลตัส',
      date: '20 ม.ค.',
      time: '06:00 - 14:00',
      location: 'บางนา',
      rate: '฿150/ชม.',
      earned: '฿1,200',
      rating: 4,
      status: 'completed'
    },
    {
      id: 6,
      title: 'พนักงานเสิร์ฟ',
      company: 'ร้านอาหารอิตาเลียน',
      date: '18 ม.ค.',
      time: '17:00 - 23:00',
      location: 'เอกมัย',
      rate: '฿175/ชม.',
      earned: '฿1,050',
      rating: 5,
      status: 'completed'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'completed': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return FiCheck;
      case 'pending': return FiClock;
      case 'completed': return FiCheck;
      default: return FiAlertCircle;
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <SafeIcon
        key={index}
        icon={FiStar}
        className={`star ${index < rating ? 'filled' : 'empty'}`}
      />
    ));
  };

  return (
    <div className="screen">
      <div className="screen-content">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">กะของฉัน</h1>
          
          {/* Tabs */}
          <div className="tabs-container">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
            >
              กำลังจะมา
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
            >
              เสร็จสิ้นแล้ว
            </button>
          </div>
        </div>

        {/* Shifts List */}
        <div className="shifts-list">
          {activeTab === 'upcoming' && upcomingShifts.map((shift) => (
            <div key={shift.id} className="shift-card">
              <div className="shift-header">
                <h3 className="shift-title">{shift.title}</h3>
                <div className="shift-rate">{shift.rate}</div>
              </div>
              
              <p className="company-name">{shift.company}</p>
              
              <div className="shift-details">
                <div className="detail-row">
                  <SafeIcon icon={FiClock} className="detail-icon" />
                  <span>{shift.date} • {shift.time}</span>
                </div>
                <div className="detail-row">
                  <SafeIcon icon={FiMapPin} className="detail-icon" />
                  <span>{shift.location}</span>
                </div>
              </div>
              
              <div className="shift-footer">
                <div className="status-badge" style={{ backgroundColor: getStatusColor(shift.status) }}>
                  <SafeIcon icon={getStatusIcon(shift.status)} className="status-icon" />
                  <span>{shift.statusText}</span>
                </div>
                
                {shift.status === 'confirmed' && (
                  <button className="contact-btn">
                    ติดต่อนายจ้าง
                  </button>
                )}
              </div>
            </div>
          ))}

          {activeTab === 'completed' && completedShifts.map((shift) => (
            <div key={shift.id} className="shift-card completed">
              <div className="shift-header">
                <h3 className="shift-title">{shift.title}</h3>
                <div className="earned-amount">{shift.earned}</div>
              </div>
              
              <p className="company-name">{shift.company}</p>
              
              <div className="shift-details">
                <div className="detail-row">
                  <SafeIcon icon={FiClock} className="detail-icon" />
                  <span>{shift.date} • {shift.time}</span>
                </div>
                <div className="detail-row">
                  <SafeIcon icon={FiMapPin} className="detail-icon" />
                  <span>{shift.location}</span>
                </div>
              </div>
              
              <div className="shift-footer">
                <div className="rating-section">
                  <span className="rating-label">คะแนนที่ได้:</span>
                  <div className="stars-container">
                    {renderStars(shift.rating)}
                  </div>
                </div>
                
                <button className="review-btn">
                  ดูรีวิว
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {((activeTab === 'upcoming' && upcomingShifts.length === 0) ||
          (activeTab === 'completed' && completedShifts.length === 0)) && (
          <div className="empty-state">
            <p className="empty-text">
              {activeTab === 'upcoming' ? 'ยังไม่มีกะงานที่กำลังจะมา' : 'ยังไม่มีกะงานที่เสร็จสิ้น'}
            </p>
            <button className="browse-jobs-btn">
              เรียกดูงานทั้งหมด
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .tabs-container {
          display: flex;
          background-color: #f8f9fa;
          border-radius: 12px;
          padding: 4px;
        }
        
        .tab {
          flex: 1;
          padding: 12px 16px;
          background: none;
          border: none;
          border-radius: 8px;
          font-family: 'Sukhumvit Set', sans-serif;
          font-weight: 500;
          font-size: 14px;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .tab.active {
          background-color: #ffffff;
          color: #111827;
          font-weight: 600;
          box-shadow: 0 2px 4px rgba(0,0,0,0.06);
        }
        
        .shifts-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .shift-card {
          background-color: #ffffff;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          border: 1px solid #f0f0f0;
          transition: all 0.2s ease;
        }
        
        .shift-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        
        .shift-card.completed {
          opacity: 0.9;
        }
        
        .shift-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }
        
        .shift-title {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          flex: 1;
        }
        
        .shift-rate {
          font-size: 16px;
          font-weight: 700;
          color: #f5c518;
          margin-left: 12px;
        }
        
        .earned-amount {
          font-size: 18px;
          font-weight: 700;
          color: #10b981;
          margin-left: 12px;
        }
        
        .company-name {
          color: #6b7280;
          font-size: 14px;
          margin-bottom: 16px;
        }
        
        .shift-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }
        
        .detail-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #6b7280;
        }
        
        .detail-icon {
          font-size: 16px;
          color: #9ca3af;
        }
        
        .shift-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .status-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          color: white;
          font-size: 12px;
          font-weight: 600;
        }
        
        .status-icon {
          font-size: 14px;
        }
        
        .contact-btn, .review-btn {
          background: none;
          border: 1px solid #f5c518;
          color: #f5c518;
          border-radius: 8px;
          padding: 8px 16px;
          font-family: 'Sukhumvit Set', sans-serif;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .contact-btn:hover, .review-btn:hover {
          background-color: #f5c518;
          color: #000;
        }
        
        .rating-section {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .rating-label {
          font-size: 14px;
          color: #6b7280;
        }
        
        .stars-container {
          display: flex;
          gap: 2px;
        }
        
        .star {
          font-size: 14px;
        }
        
        .star.filled {
          color: #f5c518;
        }
        
        .star.empty {
          color: #e5e7eb;
        }
        
        .empty-state {
          text-align: center;
          padding: 60px 20px;
        }
        
        .empty-text {
          font-size: 16px;
          color: #6b7280;
          margin-bottom: 24px;
        }
        
        .browse-jobs-btn {
          background-color: #f5c518;
          color: #000;
          border: none;
          border-radius: 12px;
          padding: 14px 28px;
          font-family: 'Sukhumvit Set', sans-serif;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .browse-jobs-btn:hover {
          background-color: #e6b315;
        }
      `}</style>
    </div>
  );
};

export default MyShifts;