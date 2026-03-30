import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

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
    <View style={{ height: 12, backgroundColor: '#e5e7eb', borderRadius: 6, overflow: 'hidden', marginVertical: 8 }}>
      <Animated.View
        style={{
          height: '100%',
          width: widthInterpolation,
          backgroundColor: '#1f2937', // black/80 essentially
          borderRadius: 6,
        }}
      />
    </View>
  );
}
