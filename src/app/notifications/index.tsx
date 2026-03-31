import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import NotificationItem from '../../components/NotificationItem';
import SectionHeader from '../../components/SectionHeader';
import { COLORS } from '../../constants/theme';

const NOTIFICATIONS = [
  {
    title: 'Today',
    data: [
      { id: '1', type: 'risk', title: 'High Risk Alert', description: 'Heavy rain expected in your area.\nNext 3 hours: High disruption probability', date: '17:00', read: false },
      { id: '2', type: 'update', title: 'Risk Update', description: 'AQI levels rising in your zone.\nModerate impact on deliveries expected', date: '11:00', read: true },
    ],
  },
  {
    title: 'Yesterday',
    data: [
      { id: '3', type: 'claim', title: 'Claim Processed', description: 'Heavy rain disruption detected.\n₹400 credited to your wallet', amount: '+₹400', date: '21:00', read: true },
      { id: '4', type: 'income', title: 'Income Impact Detected', description: 'Traffic congestion reduced your earnings by ₹120.\nProtection applied', date: '12:00', read: true },
    ],
  },
];

export default function NotificationsScreen() {
  const [filter, setFilter] = useState<'All' | 'Alerts' | 'Claims'>('All');

  const filteredData = NOTIFICATIONS.map(section => ({
    title: section.title,
    data: section.data.filter(item => {
      if (filter === 'All') return true;
      if (filter === 'Alerts') return item.type === 'risk' || item.type === 'update';
      if (filter === 'Claims') return item.type === 'claim' || item.type === 'income';
      return true;
    }),
  })).filter(section => section.data.length > 0);

  return (
    <SafeAreaView className="flex-1 bg-emerald-500">
      <View className="px-6 py-4 flex-row justify-between items-center">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-extrabold">Notifications</Text>
        <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
          <Ionicons name="checkmark-done" size={20} color="white" />
        </View>
      </View>

      <View className="flex-row px-4 mb-4 gap-2">
        {(['All', 'Alerts', 'Claims'] as const).map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setFilter(tab)}
            className={`px-4 py-2 rounded-full ${filter === tab ? 'bg-white' : 'bg-emerald-600/30'}`}
          >
            <Text className={`font-bold text-xs ${filter === tab ? 'text-emerald-700' : 'text-white/80'}`}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-1 bg-gray-50 rounded-t-[40px] px-4 pt-4">
        <SectionList
          sections={filteredData}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <NotificationItem item={item as any} />}
          renderSectionHeader={({ section: { title } }) => <SectionHeader title={title} />}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>
    </SafeAreaView>
  );
}
