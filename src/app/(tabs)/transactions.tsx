import React from 'react';
import { View, Text, SectionList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import TransactionItem, { TransactionData } from '../../components/TransactionItem';
import ProgressBar from '../../components/ProgressBar';

const TRANSACTIONS = [
  {
    title: 'April',
    data: [
      { id: '1', type: 'rain', title: 'Heavy Rain Claim', datetime: 'Today, 3:30 PM', amount: '+₹400' },
      { id: '2', type: 'aqi', title: 'High AQI Claim', datetime: 'Yesterday, 6:40 PM', amount: '+₹370' },
      { id: '3', type: 'traffic', title: 'Traffic Claim', datetime: 'April 15, 9:30 AM', amount: '+₹120' },
      { id: '4', type: 'other', title: 'Traffic Delay Impact', datetime: 'April 15, 9:00 AM', amount: '-₹120' },
      { id: '5', type: 'rain', title: 'Rain Claim', datetime: 'April 14, 2:00 PM', amount: '+₹250' },
      { id: '6', type: 'rain', title: 'Flood Claim', datetime: 'April 13, 1:00 PM', amount: '+₹500' },
    ] as TransactionData[],
  },
  {
    title: 'March',
    data: [
      { id: '7', type: 'other', title: 'Low Demand Claim', datetime: 'March 31, 7:30 PM', amount: '+₹80' },
      { id: '8', type: 'other', title: 'Weather Alert Claim', datetime: 'March 28, 5:00 PM', amount: '+₹220' },
      { id: '9', type: 'aqi', title: 'AQI Impact', datetime: 'March 25, 11:00 AM', amount: '-₹60' },
    ] as TransactionData[],
  },
];

export default function TransactionsScreen() {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-green-500">
      
      {/* HEADER */}
      <View className="px-4 pt-4 pb-4 flex-row justify-between items-center">
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>

        <Text className="text-white text-lg font-extrabold">
          Protection Activity
        </Text>

        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/notifications' as any)}>
          <Ionicons name="notifications" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* MAIN WHITE CONTAINER */}
      <View className="flex-1 bg-white rounded-t-3xl px-4 pt-4">
        
        {/* Earnings Summary Card */}
        <View className="bg-gray-50 rounded-3xl p-5 items-center mb-5" style={{ elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 }}>
          <Text className="text-gray-500 text-sm font-semibold mb-1">
            Total Protected Earnings
          </Text>
          <Text className="text-gray-900 text-3xl font-extrabold">
            ₹1,420
          </Text>
        </View>

        {/* Coverage Efficiency Section */}
        <View className="mb-6 px-1">
          <View className="flex-row justify-between items-end mb-1">
            <Text className="text-gray-700 text-sm font-bold">
              Protection Coverage Efficiency
            </Text>
            <Text className="text-green-500 text-lg font-extrabold">
              82%
            </Text>
          </View>
          <ProgressBar percentage={82} />
          <Text className="text-gray-500 text-xs mt-1">
            Most Disruptions Successfully Covered
          </Text>
        </View>

        {/* Transactions List */}
        <SectionList
          sections={TRANSACTIONS}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <TransactionItem item={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <View className="bg-white">
              <Text className="text-gray-500 text-sm font-semibold pt-4 mb-2 px-2">
                {title.toUpperCase()}
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          stickySectionHeadersEnabled={true}
          ListEmptyComponent={
            <Text className="text-center mt-10 text-gray-400">
              No transactions yet
            </Text>
          }
        />

      </View>
    </SafeAreaView>
  );
}
