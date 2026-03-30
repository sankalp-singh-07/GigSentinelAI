import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface TransactionData {
  id: string;
  type: string;
  title: string;
  datetime: string;
  amount: string;
}

interface TransactionItemProps {
  item: TransactionData;
}

export default function TransactionItem({ item }: TransactionItemProps) {
  const isNegative = item.amount.includes('-');

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row items-center justify-between p-3 mb-3 bg-blue-50 rounded-xl"
    >
      <View className="flex-row items-center gap-3 flex-1">
        {/* Circular Icon bg-blue-300 */}
        <View className="w-10 h-10 rounded-full bg-blue-200 items-center justify-center">
          <Ionicons name="cube-outline" size={20} color="#1e3a8a" />
        </View>

        {/* Title & Datetime */}
        <View className="flex-1">
          <Text className="text-gray-800 text-base font-semibold">
            {item.title}
          </Text>
          <Text className="text-gray-500 text-sm mt-0.5">
            {item.datetime}
          </Text>
        </View>
      </View>

      {/* Amount color logic */}
      <Text className={isNegative ? "text-red-500 font-bold text-base" : "text-green-600 font-bold text-base"}>
        {item.amount}
      </Text>
    </TouchableOpacity>
  );
}
