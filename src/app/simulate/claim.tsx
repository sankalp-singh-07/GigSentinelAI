import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { MOCK_CLAIM, SIMULATION_TIMING } from '../../constants/simulation';
import { COLORS } from '../../constants/theme';

interface ClaimRowProps {
  label: string;
  value: string;
  valueColor: string;
}

function ClaimRow({ label, value, valueColor }: ClaimRowProps) {
  return (
    <View className="flex-row justify-between items-center py-3 px-4 border-b border-emerald-50">
      <Text className="text-gray-500 text-sm font-medium">{label}</Text>
      <Text className="text-emerald-700 text-lg font-extrabold" style={{ color: valueColor === '#dc2626' ? '#EF4444' : '#047857' }}>{value}</Text>
    </View>
  );
}

export default function ClaimSummaryScreen() {
  const scale = useRef(new Animated.Value(0.88)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, friction: 7, tension: 100, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 450, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => router.replace('/simulate/success' as any), SIMULATION_TIMING.successDelay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={["#10B981", "#059669"]} className="flex-1">
      <SafeAreaView className="flex-1 justify-center">
        <Animated.View 
          className="mx-6 bg-white rounded-3xl overflow-hidden shadow-2xl"
          style={{ opacity, transform: [{ scale }] }}
        >
          <View className="bg-emerald-600 p-6 items-center">
            <View className="bg-white/20 p-4 rounded-full mb-4">
               <Ionicons name="document-text" size={32} color="white" />
            </View>
            <Text className="text-white text-xl font-extrabold">Claim Report</Text>
            <Text className="text-emerald-100 text-sm mt-1">Processed Successfully ✓</Text>
          </View>

          <View className="p-4">
            <View className="bg-emerald-50 rounded-2xl overflow-hidden border border-emerald-100">
              <ClaimRow label="Expected Earnings" value={MOCK_CLAIM.expectedEarnings} valueColor="text-gray-900" />
              <ClaimRow label="Actual Earnings" value={MOCK_CLAIM.actualEarnings} valueColor="text-gray-900" />
              <ClaimRow label="Loss Covered" value={MOCK_CLAIM.loss} valueColor="#dc2626" />
            </View>
          </View>

          <Text className="text-gray-400 text-xs text-center pb-6 px-6 font-medium">
            Processing payout to your wallet...
          </Text>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}
