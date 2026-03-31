import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';

interface TabSwitcherProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabSwitcher({ activeTab, onTabChange }: TabSwitcherProps) {
  const tabs = ['Today', 'This Week', 'This Month'];

  return (
    <View className="flex-row mx-4 mt-6 bg-emerald-100/50 p-1.5 rounded-2xl">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <TouchableOpacity
            key={tab}
            onPress={() => onTabChange(tab)}
            activeOpacity={0.7}
            className={`flex-1 py-3 items-center rounded-xl ${isActive ? 'bg-white shadow-sm' : ''}`}
          >
            <Text className={`font-bold text-sm ${isActive ? 'text-emerald-700' : 'text-emerald-600/70'}`}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
