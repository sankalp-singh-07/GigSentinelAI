import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SectionList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import NotificationItem, { NotificationData } from '../../components/NotificationItem';
import SectionHeader from '../../components/SectionHeader';

const NOTIFICATIONS = [
  {
    title: 'Today',
    data: [
      {
        id: '1',
        type: 'risk',
        title: 'High Risk Alert',
        description: 'Heavy rain expected in your area.\nNext 3 hours: High disruption probability',
        date: '17:00',
        read: false,
      },
      {
        id: '2',
        type: 'update',
        title: 'Risk Update',
        description: 'AQI levels rising in your zone.\nModerate impact on deliveries expected',
        date: '11:00',
        read: true,
      },
    ] as NotificationData[],
  },
  {
    title: 'Yesterday',
    data: [
      {
        id: '3',
        type: 'claim',
        title: 'Claim Processed',
        description: 'Heavy rain disruption detected.\n₹400 credited to your wallet',
        amount: '+₹400',
        date: '21:00',
        read: true,
      },
      {
        id: '4',
        type: 'income',
        title: 'Income Impact Detected',
        description: 'Traffic congestion reduced your earnings by ₹120.\nProtection applied',
        date: '12:00',
        read: true,
      },
    ] as NotificationData[],
  },
  {
    title: 'This Weekend',
    data: [
      {
        id: '5',
        type: 'risk',
        title: 'High Risk Alert',
        description: 'Heavy rain expected in your area.\nNext 3 hours: High disruption probability',
        date: '16:00 - Apr 21',
        read: true,
      },
      {
        id: '6',
        type: 'claim',
        title: 'Claim Processed',
        description: 'High AQI impact detected.\n₹370 credited instantly',
        amount: '+₹370',
        date: '20:00 - Apr 20',
        read: true,
      },
    ] as NotificationData[],
  },
];

export default function NotificationsScreen() {
  const [filter, setFilter] = useState<'All' | 'Alerts' | 'Claims'>('All');

  const filteredData = NOTIFICATIONS.map(section => {
    return {
      title: section.title,
      data: section.data.filter(item => {
        if (filter === 'All') return true;
        if (filter === 'Alerts') return item.type === 'risk' || item.type === 'update';
        if (filter === 'Claims') return item.type === 'claim' || item.type === 'income';
        return true;
      }),
    };
  }).filter(section => section.data.length > 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#4ade80' }}>
      {/* ── Header ── */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.iconButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#064e3b" />
        </TouchableOpacity>

        <Text style={{ color: '#064e3b', fontSize: 18, fontWeight: '800' }}>
          Risk Alerts & Updates
        </Text>

        <View style={[styles.iconButton, { backgroundColor: '#ffffff' }]}>
          <Ionicons name="notifications" size={20} color="#064e3b" />
        </View>
      </View>

      {/* ── Filter Tabs ── */}
      <View style={{ flexDirection: 'row', paddingHorizontal: 16, marginBottom: 16, gap: 10 }}>
        {(['All', 'Alerts', 'Claims'] as const).map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setFilter(tab)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: filter === tab ? '#064e3b' : 'rgba(255,255,255,0.3)',
              borderRadius: 20,
            }}
          >
            <Text style={{ color: filter === tab ? '#fff' : '#064e3b', fontWeight: '700', fontSize: 13 }}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── White Card Container ── */}
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          paddingHorizontal: 16,
          paddingTop: 8,
        }}
      >
        <SectionList
          sections={filteredData}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <NotificationItem item={item} />}
          renderSectionHeader={({ section: { title } }) => <SectionHeader title={title} />}
          contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
