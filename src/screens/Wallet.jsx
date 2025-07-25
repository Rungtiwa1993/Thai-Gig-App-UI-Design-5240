import React, { useState } from 'react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiDollarSign, FiTrendingUp, FiDownload, FiClock, FiCheck } = FiIcons;

const Wallet = ({ user }) => {
  const [activeTab, setActiveTab] = useState('all');

  const transactions = [
    {
      id: 1,
      type: 'earning',
      title: 'พนักงานต้อนรับ - โรงแรม แกรนด์',
      date: '23 ม.ค. 2567',
      time: '14:30',
      amount: 1600,
      status: 'completed'
    },
    {
      id: 2,
      type: 'withdrawal',
      title: 'ถอนเงินเข้าบัญชี กสิกรไทย',
      date: '22 ม.ค. 2567',
      time: '09:15',
      amount: -2500,
      status: 'completed'
    },
    {
      id: 3,
      type: 'earning',
      title: 'พนักงานจัดเรียงสินค้า - โลตัส',
      date: '20 ม.ค. 2567',
      time: '16:45',
      amount: 1200,
      status: 'completed'
    },
    {
      id: 4,
      type: 'earning',
      title: 'พนักงานเสิร์ฟ - ร้านอาหารอิตาเลียน',
      date: '18 ม.ค. 2567',
      time: '23:30',
      amount: 1050,
      status: 'pending'
    },
    {
      id: 5,
      type: 'earning',
      title: 'บาริสต้า - คาเฟ่ สตาร์บัคส์',
      date: '15 ม.ค. 2567',
      time: '15:20',
      amount: 960,
      status: 'completed'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    if (activeTab === 'all') return true;
    if (activeTab === 'earnings') return transaction.type === 'earning';
    if (activeTab === 'withdrawals') return transaction.type === 'withdrawal';
    return true;
  });

  const monthlyEarnings = transactions
    .filter(t => t.type === 'earning' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingAmount = transactions
    .filter(t => t.type === 'earning' && t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="screen">
      <div className="screen-content">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">กระเป๋าเงิน</h1>
        </div>

        {/* Balance Card */}
        <div className="balance-card">
          <div className="balance-header">
            <SafeIcon icon={FiDollarSign} className="balance-icon" />
            <span className="balance-label">ยอดเงินคงเหลือ</span>
          </div>
          <div className="balance-amount">฿{user.balance.toLocaleString()}</div>
          <div className="balance-stats">
            <div className="stat-item">
              <SafeIcon icon={FiTrendingUp} className="stat-icon" />
              <div>
                <p className="stat-value">฿{monthlyEarnings.toLocaleString()}</p>
                <p className="stat-label">รายได้เดือนนี้</p>
              </div>
            </div>
            <div className="stat-item">
              <SafeIcon icon={FiClock} className="stat-icon" />
              <div>
                <p className="stat-value">฿{pendingAmount.toLocaleString()}</p>
                <p className="stat-label">รออนุมัติ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Withdraw Button */}
        <button className="withdraw-btn">
          <SafeIcon icon={FiDownload} className="withdraw-icon" />
          ถอนเงินเข้าบัญชี
        </button>

        {/* Transaction Tabs */}
        <div className="tabs-section">
          <div className="tabs-container">
            <button
              onClick={() => setActiveTab('all')}
              className={`tab ${activeTab === 'all' ? 'active' : ''}`}
            >
              ทั้งหมด
            </button>
            <button
              onClick={() => setActiveTab('earnings')}
              className={`tab ${activeTab === 'earnings' ? 'active' : ''}`}
            >
              รายได้
            </button>
            <button
              onClick={() => setActiveTab('withdrawals')}
              className={`tab ${activeTab === 'withdrawals' ? 'active' : ''}`}
            >
              การถอน
            </button>
          </div>
        </div>

        {/* Transaction History */}
        <div className="transactions-section">
          <h3 className="section-title">ประวัติการทำรายการ</h3>
          
          <div className="transactions-list">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-left">
                  <div className={`transaction-icon ${transaction.type}`}>
                    <SafeIcon 
                      icon={transaction.type === 'earning' ? FiTrendingUp : FiDownload} 
                      className="icon"
                    />
                  </div>
                  <div className="transaction-details">
                    <h4 className="transaction-title">{transaction.title}</h4>
                    <p className="transaction-date">
                      {transaction.date} • {transaction.time}
                    </p>
                  </div>
                </div>
                
                <div className="transaction-right">
                  <div className={`transaction-amount ${transaction.type}`}>
                    {transaction.amount > 0 ? '+' : ''}฿{Math.abs(transaction.amount).toLocaleString()}
                  </div>
                  <div className={`transaction-status ${transaction.status}`}>
                    <SafeIcon 
                      icon={transaction.status === 'completed' ? FiCheck : FiClock} 
                      className="status-icon"
                    />
                    <span>{transaction.status === 'completed' ? 'เสร็จสิ้น' : 'รอดำเนินการ'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .balance-card {
          background: linear-gradient(135deg, #f5c518 0%, #e6b315 100%);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 24px;
          color: #000;
        }
        
        .balance-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        
        .balance-icon {
          font-size: 20px;
        }
        
        .balance-label {
          font-size: 16px;
          font-weight: 500;
        }
        
        .balance-amount {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 20px;
        }
        
        .balance-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        .stat-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .stat-icon {
          font-size: 18px;
        }
        
        .stat-value {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 2px;
        }
        
        .stat-label {
          font-size: 12px;
          opacity: 0.8;
        }
        
        .withdraw-btn {
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
          margin-bottom: 32px;
        }
        
        .withdraw-btn:hover {
          background-color: #e6b315;
          transform: translateY(-1px);
        }
        
        .withdraw-icon {
          font-size: 18px;
        }
        
        .tabs-section {
          margin-bottom: 24px;
        }
        
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
        
        .transactions-section {
          margin-bottom: 24px;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 16px;
        }
        
        .transactions-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .transaction-item {
          background-color: #ffffff;
          border-radius: 16px;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          border: 1px solid #f0f0f0;
        }
        
        .transaction-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }
        
        .transaction-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .transaction-icon.earning {
          background-color: #dcfce7;
        }
        
        .transaction-icon.withdrawal {
          background-color: #fef3c7;
        }
        
        .transaction-icon .icon {
          font-size: 18px;
        }
        
        .transaction-icon.earning .icon {
          color: #16a34a;
        }
        
        .transaction-icon.withdrawal .icon {
          color: #d97706;
        }
        
        .transaction-details {
          flex: 1;
        }
        
        .transaction-title {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 2px;
          line-height: 1.3;
        }
        
        .transaction-date {
          font-size: 12px;
          color: #6b7280;
        }
        
        .transaction-right {
          text-align: right;
        }
        
        .transaction-amount {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        
        .transaction-amount.earning {
          color: #16a34a;
        }
        
        .transaction-amount.withdrawal {
          color: #dc2626;
        }
        
        .transaction-status {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
          font-size: 11px;
          font-weight: 500;
        }
        
        .transaction-status.completed {
          color: #16a34a;
        }
        
        .transaction-status.pending {
          color: #d97706;
        }
        
        .status-icon {
          font-size: 12px;
        }
      `}</style>
    </div>
  );
};

export default Wallet;