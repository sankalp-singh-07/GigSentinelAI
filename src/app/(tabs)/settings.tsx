import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

export default function LayersScreen() {
  return (
    <SafeAreaView className="flex-1 bg-emerald-500">
      <View className="flex-1 items-center justify-center">
        <View className="bg-white/20 p-8 rounded-full mb-6">
          <Text className="text-white text-4xl">🛠️</Text>
        </View>
        <Text className="text-white text-3xl font-extrabold">Settings</Text>
        <Text className="text-emerald-100 text-lg mt-2">More options coming soon…</Text>
      </View>
    </SafeAreaView>
  );
}
