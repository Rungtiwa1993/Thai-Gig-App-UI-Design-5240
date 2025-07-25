import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMapPin, FiClock, FiCalendar, FiUser, FiStar, FiDollarSign } = FiIcons;

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock job data - in real app, this would come from API
  const job = {
    id: parseInt(id),
    title: 'พนักงานเสิร์ฟ',
    company: 'ร้านอาหารญี่ปุ่น ซากุระ',
    rate: '฿180',
    location: 'ห้างสยามพารากอน ชั้น 4',
    address: '991 ถ.พระราม 1 ปทุมวัน กรุงเทพฯ 10330',
    date: 'วันนี้ (25 ม.ค. 2567)',
    time: '18:00 - 22:00 น.',
    duration: '4 ชั้วโมง',
    description: 'ต้องการพนักงานเสิร์ฟที่มีประสบการณ์ในการให้บริการลูกค้า สามารถพูดภาษาอังกฤษได้เบื้องต้น มีบุคลิกดี และรักการบริการ',
    requirements: [
      'อายุ 18-35 ปี',
      'มีประสบการณ์การเสิร์ฟอย่างน้อย 6 เดือน',
      'สามารถยืนทำงานได้นาน',
      'มีบุคลิกดี ยิ้มแย้มแจ่มใส'
    ],
    employer: {
      name: 'บริษัท ซากุระ เรสโตรองต์',
      rating: 4.8,
      reviews: 156,
      verified: true
    },
    urgent: true
  };

  return (
    <div className="screen">
      <div className="screen-content">
        {/* Job Title & Company */}
        <div className="job-header-section">
          {job.urgent && (
            <div className="urgent-badge">
              <span>รับสมัครด่วน!</span>
            </div>
          )}
          
          <h2 className="job-title">{job.title}</h2>
          <div className="company-info">
            <div className="company-details">
              <h3 className="company-name">{job.company}</h3>
              <div className="employer-rating">
                <SafeIcon icon={FiStar} className="star-icon" />
                <span className="rating-text">{job.employer.rating}</span>
                <span className="review-count">({job.employer.reviews} รีวิว)</span>
                {job.employer.verified && (
                  <span className="verified-badge">✓ ยืนยันแล้ว</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="job-details-section">
          <div className="detail-grid">
            <div className="detail-item">
              <SafeIcon icon={FiDollarSign} className="detail-icon brand-yellow" />
              <div>
                <p className="detail-label">อัตราค่าจ้าง</p>
                <p className="detail-value">{job.rate}/ชั่วโมง</p>
              </div>
            </div>
            
            <div className="detail-item">
              <SafeIcon icon={FiCalendar} className="detail-icon brand-yellow" />
              <div>
                <p className="detail-label">วันที่ทำงาน</p>
                <p className="detail-value">{job.date}</p>
              </div>
            </div>
            
            <div className="detail-item">
              <SafeIcon icon={FiClock} className="detail-icon brand-yellow" />
              <div>
                <p className="detail-label">เวลาทำงาน</p>
                <p className="detail-value">{job.time}</p>
              </div>
            </div>
            
            <div className="detail-item">
              <SafeIcon icon={FiMapPin} className="detail-icon brand-yellow" />
              <div>
                <p className="detail-label">สถานที่</p>
                <p className="detail-value">{job.location}</p>
                <p className="detail-address">{job.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="section">
          <h3 className="section-title">รายละเอียดงาน</h3>
          <p className="job-description">{job.description}</p>
        </div>

        {/* Requirements */}
        <div className="section">
          <h3 className="section-title">คุณสมบัติที่ต้องการ</h3>
          <ul className="requirements-list">
            {job.requirements.map((req, index) => (
              <li key={index} className="requirement-item">
                <span className="bullet">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Apply Button */}
        <div className="apply-section">
          <button className="btn-primary apply-button">
            สมัครงานนี้เลย
          </button>
          <p className="apply-note">
            คุณจะได้รับการตอบกลับภายใน 2 ชั่วโมง
          </p>
        </div>
      </div>

      <style jsx>{`
        .job-header-section {
          position: relative;
          margin-bottom: 24px;
        }
        
        .urgent-badge {
          background-color: #f5c518;
          color: #000;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 16px;
        }
        
        .job-title {
          font-size: 28px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 12px;
          line-height: 1.2;
        }
        
        .company-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .company-name {
          font-size: 16px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 4px;
        }
        
        .employer-rating {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .star-icon {
          color: #f5c518;
          font-size: 14px;
        }
        
        .rating-text {
          font-weight: 600;
          color: #111827;
          font-size: 14px;
        }
        
        .review-count {
          color: #6b7280;
          font-size: 14px;
        }
        
        .verified-badge {
          background-color: #10b981;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          margin-left: 8px;
        }
        
        .job-details-section {
          background-color: #f8f9fa;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 24px;
        }
        
        .detail-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        
        .detail-icon {
          font-size: 20px;
          margin-top: 2px;
        }
        
        .detail-label {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 2px;
        }
        
        .detail-value {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }
        
        .detail-address {
          font-size: 14px;
          color: #6b7280;
          margin-top: 2px;
        }
        
        .section {
          margin-bottom: 24px;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 12px;
        }
        
        .job-description {
          font-size: 16px;
          line-height: 1.6;
          color: #374151;
        }
        
        .requirements-list {
          list-style: none;
          padding: 0;
        }
        
        .requirement-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 8px;
          font-size: 16px;
          color: #374151;
        }
        
        .bullet {
          color: #f5c518;
          font-weight: bold;
          margin-top: 2px;
        }
        
        .apply-section {
          margin-top: 32px;
          text-align: center;
        }
        
        .apply-button {
          font-size: 18px;
          padding: 18px 32px;
          margin-bottom: 12px;
        }
        
        .apply-note {
          font-size: 14px;
          color: #6b7280;
        }
        
        .brand-yellow {
          color: #f5c518;
        }
      `}</style>
    </div>
  );
};

export default JobDetail;