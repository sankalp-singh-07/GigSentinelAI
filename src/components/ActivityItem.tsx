import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

interface ActivityItemProps {
  icon: string;
  title: string;
  subtitle: string;
  amount: string;
  isLast?: boolean;
}

export default function ActivityItem({
  icon,
  title,
  subtitle,
  amount,
  isLast,
}: ActivityItemProps) {
  return (
    <TouchableOpacity 
      activeOpacity={0.6}
      className={`flex-row items-center justify-between p-4 ${!isLast ? 'border-b border-gray-50' : ''}`}
    >
      <View className="flex-row items-center">
        <View className="w-10 h-10 bg-emerald-50 rounded-xl items-center justify-center">
          <Ionicons name={icon as any} size={20} color={COLORS.primary} />
        </View>
        <View className="ml-3">
          <Text className="text-gray-800 font-bold">{title}</Text>
          <Text className="text-gray-400 text-xs mt-0.5">{subtitle}</Text>
        </View>
      </View>
      <Text className="text-emerald-600 font-extrabold text-lg">{amount}</Text>
    </TouchableOpacity>
  );
}
