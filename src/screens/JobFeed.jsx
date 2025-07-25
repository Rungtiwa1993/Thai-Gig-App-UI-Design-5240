import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiFilter, FiMapPin, FiClock } = FiIcons;

const JobFeed = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const jobs = [
    {
      id: 1,
      title: 'พนักงานเสิร์ฟ',
      company: 'ร้านอาหารญี่ปุ่น ซากุระ',
      rate: '฿180/ชม.',
      location: 'สยาม',
      time: '18:00 - 22:00',
      date: 'วันนี้',
      urgent: true
    },
    {
      id: 2,
      title: 'แคชเชียร์',
      company: 'ซูเปอร์มาร์เก็ต บิ๊กซี',
      rate: '฿160/ชม.',
      location: 'อโศก',
      time: '09:00 - 17:00',
      date: 'พรุ่งนี้',
      urgent: false
    },
    {
      id: 3,
      title: 'พนักงานจัดเรียงสินค้า',
      company: 'โลตัส',
      rate: '฿150/ชม.',
      location: 'บางนา',
      time: '06:00 - 14:00',
      date: '25 ม.ค.',
      urgent: false
    },
    {
      id: 4,
      title: 'บาริสต้า',
      company: 'คาเฟ่ อเมซอน',
      rate: '฿170/ชม.',
      location: 'ชิดลม',
      time: '07:00 - 15:00',
      date: '26 ม.ค.',
      urgent: true
    },
    {
      id: 5,
      title: 'พนักงานต้อนรับ',
      company: 'โรงแรม แกรนด์',
      rate: '฿200/ชม.',
      location: 'สีลม',
      time: '14:00 - 22:00',
      date: '27 ม.ค.',
      urgent: false
    }
  ];

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="screen">
      <div className="screen-content">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">หางาน</h1>
          
          {/* Search Bar */}
          <div className="search-container">
            <div className="search-input-container">
              <SafeIcon icon={FiSearch} className="search-icon" />
              <input
                type="text"
                placeholder="ค้นหางาน..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <button className="filter-btn">
              <SafeIcon icon={FiFilter} className="text-xl text-gray-600" />
            </button>
          </div>
        </div>

        {/* Job Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            พบงาน {filteredJobs.length} งาน
          </p>
        </div>

        {/* Job List */}
        <div className="job-list">
          {filteredJobs.map((job) => (
            <div key={job.id} className="job-item">
              {job.urgent && (
                <div className="urgent-badge">
                  <span>ด่วน!</span>
                </div>
              )}
              
              <div className="job-header">
                <h3 className="job-title">{job.title}</h3>
                <div className="job-rate">{job.rate}</div>
              </div>
              
              <p className="company-name">{job.company}</p>
              
              <div className="job-details">
                <div className="detail-item">
                  <SafeIcon icon={FiMapPin} className="detail-icon" />
                  <span>{job.location}</span>
                </div>
                <div className="detail-item">
                  <SafeIcon icon={FiClock} className="detail-icon" />
                  <span>{job.time}</span>
                </div>
              </div>
              
              <div className="job-footer">
                <span className="job-date">{job.date}</span>
                <button 
                  onClick={() => navigate(`/job/${job.id}`)}
                  className="apply-btn"
                >
                  สมัครงาน
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .search-container {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        
        .search-input-container {
          flex: 1;
          position: relative;
        }
        
        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          font-size: 18px;
        }
        
        .search-input {
          width: 100%;
          padding: 16px 16px 16px 48px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          font-family: 'Sukhumvit Set', sans-serif;
          font-size: 16px;
          background-color: #f8f9fa;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #f5c518;
          background-color: #ffffff;
        }
        
        .filter-btn {
          background-color: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px;
          cursor: pointer;
        }
        
        .job-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .job-item {
          background-color: #ffffff;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          border: 1px solid #f0f0f0;
          position: relative;
          transition: all 0.2s ease;
        }
        
        .job-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        
        .urgent-badge {
          position: absolute;
          top: -8px;
          right: 16px;
          background-color: #f5c518;
          color: #000;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .job-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }
        
        .job-title {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          flex: 1;
        }
        
        .job-rate {
          font-size: 18px;
          font-weight: 700;
          color: #f5c518;
          margin-left: 12px;
        }
        
        .company-name {
          color: #6b7280;
          font-size: 14px;
          margin-bottom: 16px;
        }
        
        .job-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }
        
        .detail-item {
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
        
        .job-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .job-date {
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
        }
        
        .apply-btn {
          background-color: #f5c518;
          color: #000;
          border: none;
          border-radius: 8px;
          padding: 10px 20px;
          font-family: 'Sukhumvit Set', sans-serif;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .apply-btn:hover {
          background-color: #e6b315;
        }
      `}</style>
    </div>
  );
};

export default JobFeed;