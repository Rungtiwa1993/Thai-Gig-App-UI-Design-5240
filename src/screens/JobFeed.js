import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const JobFeed = ({ navigation }) => {
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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={18} color="#9ca3af" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="ค้นหางาน..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholderTextColor="#9ca3af"
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Job Count */}
        <Text style={styles.jobCount}>
          พบงาน {filteredJobs.length} งาน
        </Text>

        {/* Job List */}
        <ScrollView style={styles.jobList} showsVerticalScrollIndicator={false}>
          {filteredJobs.map((job) => (
            <View key={job.id} style={styles.jobItem}>
              {job.urgent && (
                <View style={styles.urgentBadge}>
                  <Text style={styles.urgentText}>ด่วน!</Text>
                </View>
              )}
              
              <View style={styles.jobHeader}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.jobRate}>{job.rate}</Text>
              </View>
              
              <Text style={styles.companyName}>{job.company}</Text>
              
              <View style={styles.jobDetails}>
                <View style={styles.detailItem}>
                  <Ionicons name="location-outline" size={16} color="#9ca3af" />
                  <Text style={styles.detailText}>{job.location}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="time-outline" size={16} color="#9ca3af" />
                  <Text style={styles.detailText}>{job.time}</Text>
                </View>
              </View>
              
              <View style={styles.jobFooter}>
                <Text style={styles.jobDate}>{job.date}</Text>
                <TouchableOpacity style={styles.applyBtn}>
                  <Text style={styles.applyBtnText}>สมัครงาน</Text>
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
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 16,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 16,
    paddingLeft: 48,
    paddingRight: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterBtn: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  jobCount: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  jobList: {
    flex: 1,
  },
  jobItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  urgentBadge: {
    position: 'absolute',
    top: -8,
    right: 16,
    backgroundColor: '#f5c518',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  urgentText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  jobRate: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f5c518',
    marginLeft: 12,
  },
  companyName: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  jobDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobDate: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  applyBtn: {
    backgroundColor: '#f5c518',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  applyBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
});

export default JobFeed;