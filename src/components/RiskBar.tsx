import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { Colors } from '../constants/theme';

interface RiskBarProps {
  score: number;      // 0-100
  label: string;      // e.g. "72% - HIGH RISK"
  message: string;
}

export default function RiskBar({ score, label, message }: RiskBarProps) {
  const animWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animWidth, {
      toValue: score,
      duration: 900,
      useNativeDriver: false,
    }).start();
  }, [score]);

  const widthInterpolated = animWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View
      style={{
        marginHorizontal: 16,
        marginTop: 14,
        backgroundColor: Colors.bgCard,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: Colors.primaryDark,
      }}
    >
      {/* Row: label + value */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        {/* "RISK SCORE" pill */}
        <View
          style={{
            backgroundColor: '#111',
            borderRadius: 20,
            paddingHorizontal: 14,
            paddingVertical: 5,
          }}
        >
          <Text style={{ color: Colors.textWhite, fontSize: 11, fontWeight: '700', letterSpacing: 1 }}>
            RISK SCORE
          </Text>
        </View>

        {/* Score label + red dot */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={{ color: Colors.textWhite, fontSize: 13, fontWeight: '700' }}>
            {label}
          </Text>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: Colors.riskHigh,
            }}
          />
        </View>
      </View>

      {/* Progress bar track */}
      <View
        style={{
          height: 8,
          backgroundColor: Colors.riskBar,
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <Animated.View
          style={{
            height: '100%',
            width: widthInterpolated,
            backgroundColor: Colors.riskHigh,
            borderRadius: 4,
          }}
        />
      </View>

      {/* Message below */}
      <Text style={{ color: Colors.textMuted, fontSize: 12, marginTop: 10 }}>
        {'- '}
        {message}
      </Text>
    </View>
  );
}
