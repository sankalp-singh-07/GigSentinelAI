import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

interface ProtectionCardProps {
  plan: string;
  protectedAmount: string;
  potentialLoss: string;
}

export default function ProtectionCard({ plan, protectedAmount, potentialLoss }: ProtectionCardProps) {
  return (
    <View className="mx-4 mt-4 bg-emerald-600 rounded-2xl p-5 shadow-lg">
      <View className="flex-row justify-between items-center mb-6">
        <View className="flex-row items-center">
          <Ionicons name="shield-checkmark" size={20} color="white" />
          <Text className="text-white font-bold ml-2">Active Protection</Text>
        </View>
        <View className="bg-white/20 px-3 py-1 rounded-full">
          <Text className="text-white text-xs font-bold">{plan}</Text>
        </View>
      </View>
      
      <View className="flex-row gap-6">
        <View className="flex-1">
          <Text className="text-emerald-100 text-xs font-medium mb-1">Protected Cap</Text>
          <Text className="text-white text-xl font-extrabold">{protectedAmount}</Text>
        </View>
        
        <View className="w-[1] h-full bg-emerald-500/50" />
        
        <View className="flex-1">
          <Text className="text-emerald-100 text-xs font-medium mb-1">Potential Pay</Text>
          <Text className="text-white text-xl font-extrabold">{potentialLoss}</Text>
        </View>
      </View>
    </View>
  );
}
