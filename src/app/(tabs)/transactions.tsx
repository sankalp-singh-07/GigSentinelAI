import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

const TRANSACTIONS = [
  { id: '1', type: 'Credit', amount: '₹400.00', title: 'Rain Protection Claim', date: '31 Mar, 2:30 PM', status: 'Completed' },
  { id: '2', type: 'Debit', amount: '₹35.00', title: 'Weekly Plan Renewal', date: '30 Mar, 10:00 AM', status: 'Completed' },
  { id: '3', type: 'Credit', amount: '₹370.00', title: 'AQI Protection Claim', date: '28 Mar, 6:40 PM', status: 'Completed' },
  { id: '4', type: 'Credit', amount: '₹150.00', title: 'Late Delivery Shield', date: '28 Mar, 1:15 PM', status: 'Completed' },
];

export default function TransactionsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-emerald-500">
      <View className="px-6 py-4 flex-row justify-between items-center">
        <Text className="text-white text-2xl font-bold">Transactions</Text>
        <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
          <Ionicons name="filter-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="bg-gray-50 rounded-t-[40px] px-4 pt-8 min-h-[700px]">
          {TRANSACTIONS.map((item) => (
            <View key={item.id} className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100 flex-row items-center">
              <View className={`w-12 h-12 rounded-full items-center justify-center ${item.type === 'Credit' ? 'bg-emerald-50' : 'bg-gray-50'}`}>
                <Ionicons 
                  name={item.type === 'Credit' ? 'add-circle-outline' : 'remove-circle-outline'} 
                  size={24} 
                  color={item.type === 'Credit' ? COLORS.primary : COLORS.textSecondary} 
                />
              </View>
              
              <View className="ml-4 flex-1">
                <Text className="text-gray-800 font-bold">{item.title}</Text>
                <Text className="text-gray-400 text-xs mt-1">{item.date}</Text>
              </View>
              
              <View className="items-end">
                <Text className={`font-extrabold text-lg ${item.type === 'Credit' ? 'text-emerald-600' : 'text-gray-800'}`}>
                  {item.type === 'Credit' ? '+' : '-'}{item.amount}
                </Text>
                <View className={`px-2 py-0.5 rounded-full mt-1 ${item.status === 'Completed' ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                  <Text className={`text-[10px] font-bold ${item.status === 'Completed' ? 'text-emerald-700' : 'text-gray-500'}`}>
                    {item.status.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
