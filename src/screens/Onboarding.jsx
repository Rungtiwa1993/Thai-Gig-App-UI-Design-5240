import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUpload, FiCamera, FiCheck, FiArrowRight, FiMapPin, FiUser } = FiIcons;

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    idCard: null,
    selfie: null,
    skills: [],
    workAreas: []
  });

  const totalSteps = 5;

  const skillsList = [
    'การเสิร์ฟอาหาร',
    'การใช้ระบบ POS',
    'ภาษาอังกฤษ',
    'การต้อนรับลูกค้า',
    'การทำงานเป็นทีม',
    'การทำความสะอาด',
    'การจัดเรียงสินค้า',
    'การทำกาแฟ',
    'การขาย',
    'การใช้คอมพิวเตอร์'
  ];

  const workAreasList = [
    'สยาม',
    'อโศก',
    'ชิดลม',
    'สีลม',
    'เอกมัย',
    'ทองหล่อ',
    'บางนา',
    'ลาดพร้าว',
    'รัชดาภิเษก',
    'สุขุมวิท'
  ];

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleAreaToggle = (area) => {
    setFormData(prev => ({
      ...prev,
      workAreas: prev.workAreas.includes(area)
        ? prev.workAreas.filter(a => a !== area)
        : [...prev.workAreas, area]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      navigate('/');
    }
  };

  const handleFileUpload = (type) => {
    // Simulate file upload
    setFormData(prev => ({
      ...prev,
      [type]: `${type}_uploaded.jpg`
    }));
  };

  const renderProgressBar = () => (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
      <span className="progress-text">{currentStep}/{totalSteps}</span>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">ยินดีต้อนรับ! 👋</h2>
              <p className="step-subtitle">
                มาเริ่มต้นการตั้งค่าบัญชีของคุณให้เสร็จสิ้นกันเถอะ
              </p>
            </div>
            <div className="welcome-features">
              <div className="feature-item">
                <div className="feature-icon">💼</div>
                <div>
                  <h3>หางานได้ง่าย</h3>
                  <p>ค้นหางาน part-time ที่เหมาะกับคุณ</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">💰</div>
                <div>
                  <h3>รายได้ทันที</h3>
                  <p>รับเงินหลังเสร็จงานทันที</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⭐</div>
                <div>
                  <h3>สร้างชื่อเสียง</h3>
                  <p>สะสมคะแนนและรีวิวจากนายจ้าง</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">อัปโหลดบัตรประชาชน</h2>
              <p className="step-subtitle">
                เพื่อยืนยันตัวตนและความปลอดภัยของคุณ
              </p>
            </div>
            <div className="upload-section">
              <div className={`upload-card ${formData.idCard ? 'uploaded' : ''}`}>
                <SafeIcon icon={formData.idCard ? FiCheck : FiUpload} className="upload-icon" />
                <h3>{formData.idCard ? 'อัปโหลดเสร็จสิ้น' : 'อัปโหลดบัตรประชาชน'}</h3>
                <p>รองรับไฟล์ JPG, PNG ขนาดไม่เกิน 5MB</p>
                <button 
                  onClick={() => handleFileUpload('idCard')}
                  className="upload-btn"
                >
                  {formData.idCard ? 'เปลี่ยนไฟล์' : 'เลือกไฟล์'}
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">ถ่ายรูปเซลฟี่</h2>
              <p className="step-subtitle">
                เพื่อยืนยันว่าคุณเป็นเจ้าของบัตรประชาชน
              </p>
            </div>
            <div className="upload-section">
              <div className={`upload-card ${formData.selfie ? 'uploaded' : ''}`}>
                <SafeIcon icon={formData.selfie ? FiCheck : FiCamera} className="upload-icon" />
                <h3>{formData.selfie ? 'ถ่ายรูปเสร็จสิ้น' : 'ถ่ายรูปเซลฟี่'}</h3>
                <p>ถ่ายรูปให้เห็นใบหน้าชัดเจน</p>
                <button 
                  onClick={() => handleFileUpload('selfie')}
                  className="upload-btn"
                >
                  {formData.selfie ? 'ถ่ายใหม่' : 'เปิดกล้อง'}
                </button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">เลือกทักษะที่มี</h2>
              <p className="step-subtitle">
                เลือกทักษะที่คุณมี เพื่อให้เราแนะนำงานที่เหมาะสม
              </p>
            </div>
            <div className="selection-grid">
              {skillsList.map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`selection-item ${formData.skills.includes(skill) ? 'selected' : ''}`}
                >
                  <span>{skill}</span>
                  {formData.skills.includes(skill) && (
                    <SafeIcon icon={FiCheck} className="check-icon" />
                  )}
                </button>
              ))}
            </div>
            <p className="selection-note">
              เลือกได้หลายรายการ (เลือกอย่างน้อย 3 ทักษะ)
            </p>
          </div>
        );

      case 5:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">เลือกพื้นที่การทำงาน</h2>
              <p className="step-subtitle">
                เลือกพื้นที่ที่คุณสามารถเดินทางไปทำงานได้
              </p>
            </div>
            <div className="selection-grid">
              {workAreasList.map((area) => (
                <button
                  key={area}
                  onClick={() => handleAreaToggle(area)}
                  className={`selection-item ${formData.workAreas.includes(area) ? 'selected' : ''}`}
                >
                  <SafeIcon icon={FiMapPin} className="area-icon" />
                  <span>{area}</span>
                  {formData.workAreas.includes(area) && (
                    <SafeIcon icon={FiCheck} className="check-icon" />
                  )}
                </button>
              ))}
            </div>
            <p className="selection-note">
              เลือกได้หลายรายการ (เลือกอย่างน้อย 2 พื้นที่)
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return true;
      case 2: return formData.idCard !== null;
      case 3: return formData.selfie !== null;
      case 4: return formData.skills.length >= 3;
      case 5: return formData.workAreas.length >= 2;
      default: return false;
    }
  };

  return (
    <div className="screen">
      <div className="onboarding-container">
        {/* Progress Bar */}
        {renderProgressBar()}

        {/* Step Content */}
        {renderStep()}

        {/* Navigation */}
        <div className="navigation">
          <button 
            onClick={handleNext}
            disabled={!isStepValid()}
            className="next-btn"
          >
            {currentStep === totalSteps ? 'เสร็จสิ้น' : 'ถัดไป'}
            <SafeIcon icon={FiArrowRight} className="arrow-icon" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .onboarding-container {
          padding: 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .progress-container {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
        }
        
        .progress-bar {
          flex: 1;
          height: 8px;
          background-color: #f3f4f6;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background-color: #f5c518;
          transition: width 0.3s ease;
        }
        
        .progress-text {
          font-size: 14px;
          font-weight: 600;
          color: #6b7280;
        }
        
        .step-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .step-header {
          text-align: center;
          margin-bottom: 32px;
        }
        
        .step-title {
          font-size: 28px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 12px;
        }
        
        .step-subtitle {
          font-size: 16px;
          color: #6b7280;
          line-height: 1.5;
        }
        
        .welcome-features {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 16px;
          border: 1px solid #f0f0f0;
        }
        
        .feature-icon {
          font-size: 32px;
        }
        
        .feature-item h3 {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 4px;
        }
        
        .feature-item p {
          font-size: 14px;
          color: #6b7280;
        }
        
        .upload-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .upload-card {
          background-color: #ffffff;
          border: 2px dashed #d1d5db;
          border-radius: 20px;
          padding: 40px 20px;
          text-align: center;
          width: 100%;
          max-width: 300px;
          transition: all 0.2s ease;
        }
        
        .upload-card.uploaded {
          border-color: #f5c518;
          background-color: #fffbeb;
        }
        
        .upload-icon {
          font-size: 48px;
          color: #9ca3af;
          margin-bottom: 16px;
        }
        
        .upload-card.uploaded .upload-icon {
          color: #f5c518;
        }
        
        .upload-card h3 {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 8px;
        }
        
        .upload-card p {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 20px;
        }
        
        .upload-btn {
          background-color: #f5c518;
          color: #000;
          border: none;
          border-radius: 12px;
          padding: 12px 24px;
          font-family: 'Sukhumvit Set', sans-serif;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .upload-btn:hover {
          background-color: #e6b315;
        }
        
        .selection-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }
        
        .selection-item {
          background-color: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: 'Sukhumvit Set', sans-serif;
          font-weight: 500;
          font-size: 14px;
          color: #374151;
          position: relative;
          text-align: center;
        }
        
        .selection-item:hover {
          border-color: #f5c518;
        }
        
        .selection-item.selected {
          background-color: #f5c518;
          border-color: #f5c518;
          color: #000;
        }
        
        .area-icon {
          font-size: 16px;
        }
        
        .check-icon {
          position: absolute;
          top: 6px;
          right: 6px;
          font-size: 14px;
        }
        
        .selection-note {
          font-size: 14px;
          color: #6b7280;
          text-align: center;
        }
        
        .navigation {
          margin-top: 32px;
        }
        
        .next-btn {
          width: 100%;
          background-color: #f5c518;
          color: #000;
          border: none;
          border-radius: 16px;
          padding: 18px 24px;
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
        
        .next-btn:disabled {
          background-color: #e5e7eb;
          color: #9ca3af;
          cursor: not-allowed;
        }
        
        .next-btn:not(:disabled):hover {
          background-color: #e6b315;
          transform: translateY(-1px);
        }
        
        .arrow-icon {
          font-size: 18px;
        }
      `}</style>
    </div>
  );
};

export default Onboarding;