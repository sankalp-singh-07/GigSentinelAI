import React, { useEffect, useRef } from 'react';
import { Animated, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SIM_COLORS } from '../constants/simulation';

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
      {/* Step row */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: SIM_COLORS.stepActive,
          borderRadius: 14,
          padding: 14,
          borderWidth: 1,
          borderColor: SIM_COLORS.stepBorder,
          marginBottom: 4,
        }}
      >
        {/* Check icon */}
        <Animated.View
          style={{
            transform: [{ scale: checkScale }],
            marginRight: 12,
          }}
        >
          <Ionicons name="checkmark-circle" size={26} color={SIM_COLORS.checkGreen} />
        </Animated.View>

        {/* Step icon + label */}
        <Ionicons
          name={icon as any}
          size={20}
          color={SIM_COLORS.primary}
          style={{ marginRight: 10 }}
        />
        <Text
          style={{
            color: SIM_COLORS.textWhite,
            fontSize: 15,
            fontWeight: '600',
            flex: 1,
          }}
        >
          {label}
        </Text>
      </View>

      {/* Down arrow between steps */}
      {!isLast && (
        <View style={{ alignItems: 'center', marginVertical: 2 }}>
          <Ionicons name="chevron-down" size={18} color={SIM_COLORS.checkGreen} />
        </View>
      )}
    </Animated.View>
  );
}
