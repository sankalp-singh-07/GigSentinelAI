import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

interface RiskBarProps {
  score: number;      // 0-100
  label: string;
  message: string;
}

export default function RiskBar({ score, label, message }: RiskBarProps) {
  return (
    <View className="mx-4 mt-4 bg-white rounded-2xl p-5 shadow-md border border-emerald-50">
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center">
          <Ionicons name="warning-outline" size={18} color={COLORS.danger} />
          <Text className="text-red-500 font-bold ml-2 tracking-wide text-xs">{label.toUpperCase()}</Text>
        </View>
        <Text className="text-gray-400 text-xs font-medium">{score}% Chance</Text>
      </View>
      
      {/* Progress Bar Container */}
      <View className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
        {/* Actual Progress */}
        <View 
          className="h-full bg-red-500 rounded-full" 
          style={{ width: `${score}%` }} 
        />
      </View>
      
      <Text className="text-gray-600 text-sm font-medium leading-5">
        {message}
      </Text>
    </View>
  );
}
