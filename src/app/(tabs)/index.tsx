import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import Header from '../../components/Header';
import EarningsCard from '../../components/EarningsCard';
import RiskBar from '../../components/RiskBar';
import ProtectionCard from '../../components/ProtectionCard';
import TabSwitcher from '../../components/TabSwitcher';
import ActivityItem from '../../components/ActivityItem';

import {
  COLORS,
  MOCK_USER,
  MOCK_EARNINGS,
  MOCK_RISK,
  MOCK_PROTECTION,
  MOCK_ACTIVITIES,
} from "../../constants/theme";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('This Month');

  return (
    <SafeAreaView className="flex-1 bg-emerald-500">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <Header name={MOCK_USER.name} />

        {/* ── Earnings ── */}
        <EarningsCard
          expected={MOCK_EARNINGS.expected}
          today={MOCK_EARNINGS.today}
        />

        {/* ── Risk Score ── */}
        <RiskBar
          score={MOCK_RISK.score}
          label={MOCK_RISK.label}
          message={MOCK_RISK.message}
        />

        {/* ── Protection Card ── */}
        <ProtectionCard
          plan={MOCK_PROTECTION.plan}
          protectedAmount={MOCK_PROTECTION.protectedAmount}
          potentialLoss={MOCK_PROTECTION.potentialLoss}
        />

        <View
          className="mx-4 mt-4 bg-white rounded-2xl shadow-md overflow-hidden"
        >
          {MOCK_ACTIVITIES.map((item, index) => (
            <ActivityItem
              key={item.id}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              amount={item.amount}
              isLast={index === MOCK_ACTIVITIES.length - 1}
            />
          ))}
        </View>

        {/* ── CTA Button ── */}
        <TouchableOpacity
          onPress={() => router.push("/simulate" as any)}
          activeOpacity={0.85}
          className="mx-4 mt-6 bg-white rounded-full flex-row items-center justify-center py-4 shadow-lg mb-6"
        >
          <Ionicons name="cloud" size={20} color={COLORS.primary} />
          <Text className="ml-2 text-emerald-600 text-lg font-extrabold">
            Simulate Rain Event
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
