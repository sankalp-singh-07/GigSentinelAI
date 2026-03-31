import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

import { COLORS } from '../constants/theme';

interface ProgressBarProps {
  percentage: number;
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  const widthInterpolation = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={{ height: 12, backgroundColor: '#f0fdf4', borderRadius: 6, overflow: 'hidden', marginVertical: 8 }}>
      <Animated.View
        style={{
          height: '100%',
          width: widthInterpolation,
          backgroundColor: COLORS.primary, // green (main)
          borderRadius: 6,
        }}
      />
    </View>
  );
}
