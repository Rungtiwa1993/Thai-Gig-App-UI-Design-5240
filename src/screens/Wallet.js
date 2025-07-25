import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Balance Card */}
        <LinearGradient
          colors={['#f5c518', '#e6b315']}
          style={styles.balanceCard}
        >
          <View style={styles.balanceHeader}>
            <Ionicons name="card" size={20} color="#000" />
            <Text style={styles.balanceLabel}>ยอดเงินคงเหลือ</Text>
          </View>
          <Text style={styles.balanceAmount}>฿{user.balance.toLocaleString()}</Text>
          <View style={styles.balanceStats}>
            <View style={styles.statItem}>
              <Ionicons name="trending-up" size={18} color="#000" />
              <View>
                <Text style={styles.statValue}>฿{monthlyEarnings.toLocaleString()}</Text>
                <Text style={styles.statLabel}>รายได้เดือนนี้</Text>
              </View>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="time" size={18} color="#000" />
              <View>
                <Text style={styles.statValue}>฿{pendingAmount.toLocaleString()}</Text>
                <Text style={styles.statLabel}>รออนุมัติ</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Withdraw Button */}
        <TouchableOpacity style={styles.withdrawBtn}>
          <Ionicons name="download" size={18} color="#000" />
          <Text style={styles.withdrawBtnText}>ถอนเงินเข้าบัญชี</Text>
        </TouchableOpacity>

        {/* Transaction Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab('all')}
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
              ทั้งหมด
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('earnings')}
            style={[styles.tab, activeTab === 'earnings' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'earnings' && styles.activeTabText]}>
              รายได้
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('withdrawals')}
            style={[styles.tab, activeTab === 'withdrawals' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'withdrawals' && styles.activeTabText]}>
              การถอน
            </Text>
          </TouchableOpacity>
        </View>

        {/* Transaction History */}
        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>ประวัติการทำรายการ</Text>
          
          <ScrollView style={styles.transactionsList} showsVerticalScrollIndicator={false}>
            {filteredTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <View style={[
                    styles.transactionIcon,
                    transaction.type === 'earning' ? styles.earningIcon : styles.withdrawalIcon
                  ]}>
                    <Ionicons 
                      name={transaction.type === 'earning' ? 'trending-up' : 'download'} 
                      size={18}
                      color={transaction.type === 'earning' ? '#16a34a' : '#d97706'}
                    />
                  </View>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionTitle}>{transaction.title}</Text>
                    <Text style={styles.transactionDate}>
                      {transaction.date} • {transaction.time}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.transactionRight}>
                  <Text style={[
                    styles.transactionAmount,
                    transaction.type === 'earning' ? styles.earningAmount : styles.withdrawalAmount
                  ]}>
                    {transaction.amount > 0 ? '+' : ''}฿{Math.abs(transaction.amount).toLocaleString()}
                  </Text>
                  <View style={[
                    styles.transactionStatus,
                    transaction.status === 'completed' ? styles.completedStatus : styles.pendingStatus
                  ]}>
                    <Ionicons 
                      name={transaction.status === 'completed' ? 'checkmark-circle' : 'time'} 
                      size={12}
                      color={transaction.status === 'completed' ? '#16a34a' : '#d97706'}
                    />
                    <Text style={[
                      styles.statusText,
                      transaction.status === 'completed' ? styles.completedText : styles.pendingText
                    ]}>
                      {transaction.status === 'completed' ? 'เสร็จสิ้น' : 'รอดำเนินการ'}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  balanceCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
  },
  balanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#000',
    opacity: 0.8,
  },
  withdrawBtn: {
    backgroundColor: '#f5c518',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  withdrawBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#111827',
    fontWeight: '600',
  },
  transactionsSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  transactionsList: {
    flex: 1,
  },
  transactionItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  earningIcon: {
    backgroundColor: '#dcfce7',
  },
  withdrawalIcon: {
    backgroundColor: '#fef3c7',
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  earningAmount: {
    color: '#16a34a',
  },
  withdrawalAmount: {
    color: '#dc2626',
  },
  transactionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '500',
  },
  completedStatus: {},
  pendingStatus: {},
  completedText: {
    color: '#16a34a',
  },
  pendingText: {
    color: '#d97706',
  },
});

export default Wallet;