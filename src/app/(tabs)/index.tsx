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
  Colors,
  MOCK_USER,
  MOCK_EARNINGS,
  MOCK_RISK,
  MOCK_PROTECTION,
  MOCK_ACTIVITIES,
} from '../../constants/theme';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('This Month');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgDark }}>
      <ScrollView
        style={{ flex: 1 }}
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

        {/* ── Tab Switcher ── */}
        <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

        {/* ── Activity List ── */}
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 14,
            backgroundColor: Colors.bgCard,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: Colors.primaryDark,
            overflow: 'hidden',
          }}
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
          onPress={() => router.push('/simulate' as any)}
          activeOpacity={0.85}
          style={{
            marginHorizontal: 16,
            marginTop: 20,
            backgroundColor: Colors.primary,
            borderRadius: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 16,
            gap: 10,
            shadowColor: Colors.primary,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.45,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <Ionicons name="cloud" size={20} color={Colors.bgDark} />
          <Text
            style={{
              color: Colors.bgDark,
              fontSize: 16,
              fontWeight: '800',
              letterSpacing: 0.3,
            }}
          >
            Simulate Rain Event
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
