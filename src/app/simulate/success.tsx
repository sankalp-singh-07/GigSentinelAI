import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import LoadingCircle from '../../components/LoadingCircle';
import { MOCK_CLAIM } from '../../constants/simulation';

export default function SuccessScreen() {
  const textOpacity = useRef(new Animated.Value(0)).current;
  const btnOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(textOpacity, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    }, 500);

    setTimeout(() => {
      Animated.timing(btnOpacity, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }, 1500);
  }, []);

  return (
    <LinearGradient colors={["#10B981", "#059669"]} className="flex-1">
      <SafeAreaView className="flex-1 items-center justify-center">
        <LoadingCircle size={160} />

        <Animated.View className="items-center mt-12 px-8" style={{ opacity: textOpacity }}>
          <Text className="text-white text-5xl font-black">{MOCK_CLAIM.payout}</Text>
          <Text className="text-white text-2xl font-bold mt-2">Credited Instantly ✅</Text>
          <Text className="text-emerald-100 text-center mt-4 text-lg font-semibold">
            Your Income is Protected 🛡️{'\n'}GigSentinel has got you covered.
          </Text>
        </Animated.View>

        <Animated.View className="mt-16 w-[80%]" style={{ opacity: btnOpacity }}>
          <TouchableOpacity
            onPress={() => router.replace('/' as any)}
            activeOpacity={0.8}
            className="bg-white rounded-full py-4 items-center shadow-lg"
          >
            <Text className="text-emerald-600 text-lg font-extrabold">Back to Home</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}
