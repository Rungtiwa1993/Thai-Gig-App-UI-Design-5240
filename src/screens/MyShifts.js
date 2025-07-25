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
      case 'confirmed': return 'checkmark-circle';
      case 'pending': return 'time';
      case 'completed': return 'checkmark-circle';
      default: return 'alert-circle';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={14}
        color={index < rating ? '#f5c518' : '#e5e7eb'}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab('upcoming')}
            style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
              กำลังจะมา
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('completed')}
            style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
              เสร็จสิ้นแล้ว
            </Text>
          </TouchableOpacity>
        </View>

        {/* Shifts List */}
        <ScrollView style={styles.shiftsList} showsVerticalScrollIndicator={false}>
          {activeTab === 'upcoming' && upcomingShifts.map((shift) => (
            <View key={shift.id} style={styles.shiftCard}>
              <View style={styles.shiftHeader}>
                <Text style={styles.shiftTitle}>{shift.title}</Text>
                <Text style={styles.shiftRate}>{shift.rate}</Text>
              </View>
              
              <Text style={styles.companyName}>{shift.company}</Text>
              
              <View style={styles.shiftDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={16} color="#9ca3af" />
                  <Text style={styles.detailText}>{shift.date} • {shift.time}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="location-outline" size={16} color="#9ca3af" />
                  <Text style={styles.detailText}>{shift.location}</Text>
                </View>
              </View>
              
              <View style={styles.shiftFooter}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(shift.status) }]}>
                  <Ionicons name={getStatusIcon(shift.status)} size={14} color="white" />
                  <Text style={styles.statusText}>{shift.statusText}</Text>
                </View>
                
                {shift.status === 'confirmed' && (
                  <TouchableOpacity style={styles.contactBtn}>
                    <Text style={styles.contactBtnText}>ติดต่อนายจ้าง</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}

          {activeTab === 'completed' && completedShifts.map((shift) => (
            <View key={shift.id} style={[styles.shiftCard, styles.completedCard]}>
              <View style={styles.shiftHeader}>
                <Text style={styles.shiftTitle}>{shift.title}</Text>
                <Text style={styles.earnedAmount}>{shift.earned}</Text>
              </View>
              
              <Text style={styles.companyName}>{shift.company}</Text>
              
              <View style={styles.shiftDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={16} color="#9ca3af" />
                  <Text style={styles.detailText}>{shift.date} • {shift.time}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="location-outline" size={16} color="#9ca3af" />
                  <Text style={styles.detailText}>{shift.location}</Text>
                </View>
              </View>
              
              <View style={styles.shiftFooter}>
                <View style={styles.ratingSection}>
                  <Text style={styles.ratingLabel}>คะแนนที่ได้:</Text>
                  <View style={styles.starsContainer}>
                    {renderStars(shift.rating)}
                  </View>
                </View>
                
                <TouchableOpacity style={styles.reviewBtn}>
                  <Text style={styles.reviewBtnText}>ดูรีวิว</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
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
  shiftsList: {
    flex: 1,
  },
  shiftCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  completedCard: {
    opacity: 0.9,
  },
  shiftHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  shiftTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  shiftRate: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f5c518',
    marginLeft: 12,
  },
  earnedAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10b981',
    marginLeft: 12,
  },
  companyName: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  shiftDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
  },
  shiftFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  contactBtn: {
    borderWidth: 1,
    borderColor: '#f5c518',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  contactBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#f5c518',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewBtn: {
    borderWidth: 1,
    borderColor: '#f5c518',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  reviewBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#f5c518',
  },
});

export default MyShifts;