import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface TabConfig {
  name: string;
  icon: IoniconName;
}

const TAB_CONFIGS: TabConfig[] = [
  { name: 'index',        icon: 'home-outline' },
  { name: 'explore',      icon: 'stats-chart-outline' },
  { name: 'transactions', icon: 'swap-horizontal' },
  { name: 'settings',     icon: 'layers-outline' },
  { name: 'profile',      icon: 'person-outline' },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: '#ffffff',
          borderTopWidth: 0.5,
          elevation: 10,
        },
      }}
    >
      {TAB_CONFIGS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <Ionicons
                  name={tab.icon}
                  size={24}
                  color={focused ? '#22c55e' : '#6b7280'}
                />
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
