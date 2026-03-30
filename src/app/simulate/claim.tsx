import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { MOCK_CLAIM, SIMULATION_TIMING, SIM_COLORS } from '../../constants/simulation';

interface ClaimRowProps {
  label: string;
  value: string;
  valueColor: string;
}

function ClaimRow({ label, value, valueColor }: ClaimRowProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 14,
      }}
    >
      <Text style={{ color: '#166534', fontSize: 14, fontWeight: '500' }}>{label}</Text>
      <Text style={{ color: valueColor, fontSize: 16, fontWeight: '800' }}>{value}</Text>
    </View>
  );
}

export default function ClaimSummaryScreen() {
  const scale = useRef(new Animated.Value(0.88)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const iconBounce = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    // Card scale + fade in
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 7,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.spring(iconBounce, {
        toValue: 1,
        friction: 5,
        tension: 120,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-navigate to success after delay
    const timer = setTimeout(() => {
      router.push('/simulate/success');
    }, SIMULATION_TIMING.successDelay);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: SIM_COLORS.gradientTop, justifyContent: 'center' }}
    >
      <Animated.View
        style={{
          opacity,
          transform: [{ scale }],
          marginHorizontal: 24,
          backgroundColor: SIM_COLORS.claimBg,
          borderRadius: 24,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 16,
          elevation: 10,
        }}
      >
        {/* Card header */}
        <View
          style={{
            backgroundColor: SIM_COLORS.cardBorder,
            paddingVertical: 20,
            paddingHorizontal: 20,
            alignItems: 'center',
          }}
        >
          <Animated.View style={{ transform: [{ scale: iconBounce }] }}>
            <Ionicons name="document-text" size={40} color="#ffffff" />
          </Animated.View>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 20,
              fontWeight: '800',
              marginTop: 10,
              letterSpacing: 0.3,
            }}
          >
            Auto Claim Generated
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 }}>
            Claim processed successfully ✓
          </Text>
        </View>

        {/* Data box */}
        <View style={{ backgroundColor: SIM_COLORS.claimBox, margin: 16, borderRadius: 14 }}>
          <ClaimRow
            label="Expected Earnings"
            value={MOCK_CLAIM.expectedEarnings}
            valueColor="#14532d"
          />
          <View style={{ height: 1, backgroundColor: '#bbf7d0', marginHorizontal: 14 }} />
          <ClaimRow
            label="Actual Earnings"
            value={MOCK_CLAIM.actualEarnings}
            valueColor="#0f766e"
          />
          <View style={{ height: 1, backgroundColor: '#bbf7d0', marginHorizontal: 14 }} />
          <ClaimRow
            label="Loss Covered"
            value={MOCK_CLAIM.loss}
            valueColor="#dc2626"
          />
        </View>

        {/* Footer note */}
        <Text
          style={{
            color: '#6b7280',
            fontSize: 12,
            textAlign: 'center',
            paddingBottom: 18,
            paddingHorizontal: 20,
          }}
        >
          Processing payout... please wait 🔄
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}
