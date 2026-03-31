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
import { LinearGradient } from 'expo-linear-gradient';
import StepItem from '../../components/StepItem';
import { COLORS } from '../../constants/theme';

const SIMULATION_STEPS = [
  { id: '1', label: 'Detecting Weather Pattern', icon: 'cloud-outline' },
  { id: '2', label: 'Analyzing Earnings Impact', icon: 'stats-chart-outline' },
  { id: '3', label: 'Validating Protection Policy', icon: 'shield-checkmark-outline' },
  { id: '4', label: 'Generating Claim Report', icon: 'document-text-outline' },
];

export default function SimulationStepsScreen() {
  const [visibleSteps, setVisibleSteps] = useState<string[]>([]);
  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    SIMULATION_STEPS.forEach((step, index) => {
      setTimeout(() => {
        setVisibleSteps((prev) => [...prev, step.id]);
        if (index === SIMULATION_STEPS.length - 1) {
          setTimeout(() => router.replace('/simulate/claim' as any), 1000);
        }
      }, 800 * (index + 1));
    });

    Animated.timing(progressWidth, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: false,
    }).start();
  }, []);

  const widthPct = progressWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <LinearGradient colors={["#10B981", "#059669"]} className="flex-1">
      <SafeAreaView className="flex-1">
        {/* Top progress bar */}
        <View className="h-1.5 w-full bg-white/20">
          <Animated.View className="h-full bg-white shadow-sm" style={{ width: widthPct }} />
        </View>

        {/* Header */}
        <View className="px-6 py-6 flex-row items-center">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-4"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-extrabold flex-1">
            Simulating Event...
          </Text>
        </View>

        <ScrollView className="flex-1 px-4 mt-2" showsVerticalScrollIndicator={false}>
          <Text className="text-white/90 text-center mb-8 font-semibold text-base">
            Auto-detecting environmental conditions...
          </Text>
          
          <View className="gap-4">
            {SIMULATION_STEPS.map((step, index) => (
              <StepItem
                key={step.id}
                label={step.label}
                icon={step.icon}
                visible={visibleSteps.includes(step.id)}
                isLast={index === SIMULATION_STEPS.length - 1}
              />
            ))}
          </View>
        </ScrollView>

        <View className="p-8 items-center">
          <View className="bg-white/10 p-4 rounded-full">
             <Ionicons name="flash-outline" size={32} color="white" />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
