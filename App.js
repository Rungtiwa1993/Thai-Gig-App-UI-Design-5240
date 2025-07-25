import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import JobFeed from './src/screens/JobFeed';
import MyShifts from './src/screens/MyShifts';
import Wallet from './src/screens/Wallet';
import Profile from './src/screens/Profile';

const Tab = createBottomTabNavigator();

export default function App() {
  const currentUser = {
    name: 'สมชาย วงศ์ใหญ่',
    balance: 2850,
    rating: 4.8,
    completedJobs: 127
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" backgroundColor="#f5c518" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Jobs') {
                iconName = focused ? 'search' : 'search-outline';
              } else if (route.name === 'Shifts') {
                iconName = focused ? 'calendar' : 'calendar-outline';
              } else if (route.name === 'Wallet') {
                iconName = focused ? 'card' : 'card-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#f5c518',
            tabBarInactiveTintColor: '#9ca3af',
            tabBarStyle: {
              backgroundColor: '#ffffff',
              borderTopColor: '#f0f0f0',
              height: 80,
              paddingBottom: 20,
              paddingTop: 10,
            },
            tabBarLabelStyle: {
              fontFamily: 'System',
              fontSize: 11,
              fontWeight: '500',
            },
            headerStyle: {
              backgroundColor: '#ffffff',
              borderBottomColor: '#f0f0f0',
            },
            headerTitleStyle: {
              fontFamily: 'System',
              fontSize: 18,
              fontWeight: '600',
              color: '#111827',
            },
          })}
        >
          <Tab.Screen 
            name="Home" 
            options={{ 
              title: 'หน้าแรก',
              headerTitle: 'หน้าแรก'
            }}
          >
            {(props) => <HomeScreen {...props} user={currentUser} />}
          </Tab.Screen>
          <Tab.Screen 
            name="Jobs" 
            component={JobFeed} 
            options={{ 
              title: 'หางาน',
              headerTitle: 'หางาน'
            }} 
          />
          <Tab.Screen 
            name="Shifts" 
            component={MyShifts} 
            options={{ 
              title: 'กะของฉัน',
              headerTitle: 'กะของฉัน'
            }} 
          />
          <Tab.Screen 
            name="Wallet" 
            options={{ 
              title: 'กระเป๋าเงิน',
              headerTitle: 'กระเป๋าเงิน'
            }}
          >
            {(props) => <Wallet {...props} user={currentUser} />}
          </Tab.Screen>
          <Tab.Screen 
            name="Profile" 
            options={{ 
              title: 'โปรไฟล์',
              headerTitle: 'โปรไฟล์'
            }}
          >
            {(props) => <Profile {...props} user={currentUser} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}