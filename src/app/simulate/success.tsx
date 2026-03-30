import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import LoadingCircle from '../../components/LoadingCircle';
import { MOCK_CLAIM, SIM_COLORS } from '../../constants/simulation';

export default function SuccessScreen() {
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(20)).current;
  const btnOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Text slides up after a short delay
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslate, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, 500);

    // Button fades in a bit later
    setTimeout(() => {
      Animated.timing(btnOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1200);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: SIM_COLORS.successBg,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Rotating circle */}
      <LoadingCircle size={150} />

      {/* Payout text */}
      <Animated.View
        style={{
          opacity: textOpacity,
          transform: [{ translateY: textTranslate }],
          alignItems: 'center',
          marginTop: 36,
          paddingHorizontal: 32,
        }}
      >
        <Text
          style={{
            color: SIM_COLORS.checkGreen,
            fontSize: 38,
            fontWeight: '900',
            letterSpacing: 0.5,
          }}
        >
          {MOCK_CLAIM.payout}
        </Text>
        <Text
          style={{
            color: '#ffffff',
            fontSize: 20,
            fontWeight: '700',
            marginTop: 8,
          }}
        >
          Credited Instantly ✅
        </Text>
        <Text
          style={{
            color: SIM_COLORS.textMuted,
            fontSize: 14,
            marginTop: 10,
            textAlign: 'center',
            lineHeight: 22,
          }}
        >
          Your Income is Protected 🛡️{'\n'}GigSentinel has got you covered.
        </Text>
      </Animated.View>

      {/* Back to Home button */}
      <Animated.View style={{ opacity: btnOpacity, marginTop: 48, width: '80%' }}>
        <TouchableOpacity
          onPress={() => router.replace('/' as any)}
          activeOpacity={0.8}
          style={{
            backgroundColor: SIM_COLORS.primary,
            borderRadius: 50,
            paddingVertical: 15,
            alignItems: 'center',
            shadowColor: SIM_COLORS.primary,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.5,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <Text
            style={{
              color: SIM_COLORS.gradientTop,
              fontSize: 16,
              fontWeight: '800',
            }}
          >
            Back to Home
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}
