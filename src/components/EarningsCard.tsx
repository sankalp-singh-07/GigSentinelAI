import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

interface EarningsCardProps {
  expected: string;
  today: string;
}

export default function EarningsCard({ expected, today }: EarningsCardProps) {
  return (
    <View className="mx-4 mt-2 bg-white rounded-2xl p-5 shadow-md border border-emerald-50">
      <View className="flex-row justify-between items-start mb-6">
        <View>
          <Text className="text-gray-500 text-xs font-semibold tracking-wider">EXPECTED EARNINGS</Text>
          <Text className="text-gray-900 text-3xl font-extrabold mt-1">{expected}</Text>
        </View>
        <View className="bg-emerald-100 px-3 py-1 rounded-full flex-row items-center">
          <Ionicons name="trending-up" size={14} color={COLORS.primary} />
          <Text className="text-emerald-700 text-xs font-bold ml-1">+12%</Text>
        </View>
      </View>
      
      <View className="flex-row items-center border-t border-gray-100 pt-4">
        <View className="w-10 h-10 bg-emerald-50 rounded-full items-center justify-center">
          <Ionicons name="wallet-outline" size={20} color={COLORS.primary} />
        </View>
        <View className="ml-3">
          <Text className="text-gray-400 text-xs font-medium">Earned Today</Text>
          <Text className="text-emerald-600 text-lg font-bold">{today}</Text>
        </View>
      </View>
    </View>
  );
}
