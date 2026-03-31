import React, { useEffect, useRef } from 'react';
import { Animated, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

interface StepItemProps {
  label: string;
  icon: string;
  visible: boolean;
  isLast?: boolean;
}

export default function StepItem({ label, icon, visible, isLast }: StepItemProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;
  const checkScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(checkScale, {
          toValue: 1,
          friction: 6,
          tension: 120,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      <View
        className="flex-row items-center bg-white rounded-2xl p-4 shadow-sm border border-emerald-50 mb-1"
      >
        {/* Check icon */}
        <Animated.View
          style={{
            transform: [{ scale: checkScale }],
            marginRight: 12,
          }}
        >
          <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
        </Animated.View>

        {/* Step icon + label */}
        <Ionicons
          name={icon as any}
          size={20}
          color={COLORS.primary}
          style={{ marginRight: 10 }}
        />
        <Text
          className="text-gray-800 text-base font-bold flex-1"
        >
          {label}
        </Text>
      </View>

      {/* Connection arrow - optional, but helps visual flow */}
      {!isLast && (
        <View className="items-center mb-1">
          <Ionicons name="chevron-down" size={16} color="rgba(255,255,255,0.4)" />
        </View>
      )}
    </Animated.View>
  );
}
