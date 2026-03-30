import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, StyleSheet } from 'react-native';
import { SIM_COLORS } from '../constants/simulation';

interface LoadingCircleProps {
  size?: number;
}

export default function LoadingCircle({ size = 140 }: LoadingCircleProps) {
  const rotate = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Rotating dot
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1600,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Pulsing ring
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.12,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const rotateDeg = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const r = size / 2;
  const dotR = size * 0.07;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* Pulsing outer ring */}
      <Animated.View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: r,
          borderWidth: 2,
          borderColor: SIM_COLORS.successPulse,
          opacity: 0.35,
          transform: [{ scale: pulse }],
        }}
      />

      {/* Static circle border */}
      <View
        style={{
          width: size * 0.82,
          height: size * 0.82,
          borderRadius: size * 0.41,
          borderWidth: 3,
          borderColor: SIM_COLORS.successPulse,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Rotating dot on the circle's edge */}
        <Animated.View
          style={{
            position: 'absolute',
            width: size * 0.82,
            height: size * 0.82,
            alignItems: 'center',
            justifyContent: 'flex-start',
            transform: [{ rotate: rotateDeg }],
          }}
        >
          <View
            style={{
              width: dotR * 2,
              height: dotR * 2,
              borderRadius: dotR,
              backgroundColor: SIM_COLORS.checkGreen,
              marginTop: -dotR,
            }}
          />
        </Animated.View>
      </View>
    </View>
  );
}
