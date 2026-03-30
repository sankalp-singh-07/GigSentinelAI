import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import StepItem from '../../components/StepItem';
import { SIMULATION_STEPS, SIMULATION_TIMING, SIM_COLORS } from '../../constants/simulation';

export default function SimulationStepsScreen() {
  const [visibleSteps, setVisibleSteps] = useState<string[]>([]);
  const headerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in header
    Animated.timing(headerOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Reveal steps one by one
    SIMULATION_STEPS.forEach((step, index) => {
      setTimeout(() => {
        setVisibleSteps((prev) => [...prev, step.id]);

        // After last step, navigate to claim screen
        if (index === SIMULATION_STEPS.length - 1) {
          setTimeout(() => {
            router.push('/simulate/claim');
          }, SIMULATION_TIMING.claimDelay);
        }
      }, SIMULATION_TIMING.stepDelay * (index + 1));
    });
  }, []);

  const totalDuration =
    SIMULATION_TIMING.stepDelay * SIMULATION_STEPS.length + SIMULATION_TIMING.claimDelay;

  // Progress bar width interpolation
  const progressWidth = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progressWidth, {
      toValue: 1,
      duration: totalDuration,
      useNativeDriver: false,
    }).start();
  }, []);

  const widthPct = progressWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: SIM_COLORS.gradientTop }}>
      {/* Top progress bar */}
      <View style={{ height: 3, backgroundColor: SIM_COLORS.card, marginHorizontal: 0 }}>
        <Animated.View
          style={{
            height: '100%',
            width: widthPct,
            backgroundColor: SIM_COLORS.primary,
            borderRadius: 2,
          }}
        />
      </View>

      {/* Header */}
      <Animated.View
        style={{
          opacity: headerOpacity,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 14,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: SIM_COLORS.card,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
          }}
        >
          <Ionicons name="arrow-back" size={20} color={SIM_COLORS.textWhite} />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text style={{ color: SIM_COLORS.textWhite, fontSize: 17, fontWeight: '700' }}>
            Simulating Heavy Rain... 🌧️
          </Text>
        </View>

        <TouchableOpacity
          style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: SIM_COLORS.card,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="notifications-outline" size={20} color={SIM_COLORS.textWhite} />
        </TouchableOpacity>
      </Animated.View>

      {/* Steps list */}
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ color: SIM_COLORS.textMuted, fontSize: 13, marginBottom: 18, textAlign: 'center' }}>
          Auto-detecting environmental conditions...
        </Text>

        {SIMULATION_STEPS.map((step, index) => (
          <StepItem
            key={step.id}
            label={step.label}
            icon={step.icon}
            visible={visibleSteps.includes(step.id)}
            isLast={index === SIMULATION_STEPS.length - 1}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
