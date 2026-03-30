import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colors, TABS } from '../constants/theme';

interface TabSwitcherProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabSwitcher({ activeTab, onTabChange }: TabSwitcherProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 16,
        marginTop: 18,
        backgroundColor: Colors.bgCard,
        borderRadius: 14,
        padding: 4,
        borderWidth: 1,
        borderColor: Colors.primaryDark,
      }}
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <TouchableOpacity
            key={tab}
            onPress={() => onTabChange(tab)}
            activeOpacity={0.8}
            style={{
              flex: 1,
              paddingVertical: 9,
              alignItems: 'center',
              borderRadius: 11,
              backgroundColor: isActive ? Colors.primary : 'transparent',
            }}
          >
            <Text
              style={{
                color: isActive ? Colors.bgDark : Colors.textMuted,
                fontSize: 12,
                fontWeight: isActive ? '700' : '500',
              }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
