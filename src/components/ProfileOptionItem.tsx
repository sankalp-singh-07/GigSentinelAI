import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface ProfileOptionItemProps {
  item: {
    id: number;
    title: string;
    icon: IconName;
  };
  onPress?: () => void;
}

export default function ProfileOptionItem({ item, onPress }: ProfileOptionItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="flex-row items-center justify-between p-4 mb-3 bg-white rounded-2xl"
      style={{
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      }}
    >
      <View className="flex-row items-center flex-1">
        {/* Icon Container bg-blue-100 */}
        <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center">
          <Ionicons name={item.icon} size={20} color="#3b82f6" />
        </View>

        {/* Title Text */}
        <Text className="text-gray-800 font-medium ml-4 text-base">
          {item.title}
        </Text>
      </View>

      {/* Right Chevron */}
      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    </TouchableOpacity>
  );
}
