import React from 'react';
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

const HomeScreen = ({ navigation, user }) => {
  const quickActions = [
    { title: 'งานของฉัน', icon: 'calendar-outline', screen: 'Shifts' },
    { title: 'กระเป๋าเงิน', icon: 'card-outline', screen: 'Wallet' },
    { title: 'แจ้งเตือน', icon: 'notifications-outline', screen: 'Notifications' }
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Welcome Message */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            สวัสดี <Text style={styles.userName}>{user.name.split(' ')[0]}</Text> 👋
          </Text>
          <Text style={styles.welcomeSubtitle}>พร้อมทำงานวันนี้หรือยัง?</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <LinearGradient
            colors={['#f5c518', '#e6b315']}
            style={styles.statCard}
          >
            <Ionicons name="trending-up" size={24} color="#000" />
            <Text style={styles.statValue}>฿{user.balance.toLocaleString()}</Text>
            <Text style={styles.statLabel}>รายได้เดือนนี้</Text>
          </LinearGradient>
          
          <LinearGradient
            colors={['#f5c518', '#e6b315']}
            style={styles.statCard}
          >
            <Ionicons name="star" size={24} color="#000" />
            <Text style={styles.statValue}>{user.rating}</Text>
            <Text style={styles.statLabel}>คะแนนเฉลี่ย</Text>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>เข้าถึงด่วน</Text>
          <View style={styles.quickActions}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionBtn}
                onPress={() => navigation.navigate(action.screen)}
              >
                <Ionicons name={action.icon} size={24} color="#f5c518" />
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Jobs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>งานแนะนำ</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Jobs')}>
              <Text style={styles.seeAllText}>ดูทั้งหมด</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.jobCarousel}>
              {featuredJobs.map((job) => (
                <View key={job.id} style={styles.jobCard}>
                  <View style={styles.jobHeader}>
                    <Text style={styles.jobTitle}>{job.title}</Text>
                    <Text style={styles.jobCompany}>{job.company}</Text>
                  </View>
                  <View style={styles.jobDetails}>
                    <Text style={styles.jobRate}>{job.rate}</Text>
                    <Text style={styles.jobLocation}>{job.location} • {job.date}</Text>
                  </View>
                  <TouchableOpacity style={styles.applyBtn}>
                    <Text style={styles.applyBtnText}>สมัครงาน</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    paddingTop: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  userName: {
    color: '#f5c518',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#000',
    opacity: 0.8,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f5c518',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  quickActionBtn: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    marginTop: 8,
    textAlign: 'center',
  },
  jobCarousel: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
  },
  jobCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    width: 280,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  jobHeader: {
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  jobCompany: {
    fontSize: 14,
    color: '#6b7280',
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  jobRate: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f5c518',
  },
  jobLocation: {
    fontSize: 14,
    color: '#6b7280',
  },
  applyBtn: {
    backgroundColor: '#f5c518',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  applyBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default HomeScreen;