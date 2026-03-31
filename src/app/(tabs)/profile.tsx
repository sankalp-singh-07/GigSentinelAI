import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { COLORS } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import ProfileOptionItem from '../../components/ProfileOptionItem';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface OptionType {
  id: number;
  title: string;
  icon: IconName;
}

const OPTIONS: OptionType[] = [
  { id: 1, title: 'Edit Profile', icon: 'person-outline' },
  { id: 2, title: 'Security', icon: 'shield-checkmark-outline' },
  { id: 3, title: 'Setting', icon: 'settings-outline' },
  { id: 4, title: 'Help', icon: 'help-circle-outline' },
  { id: 5, title: 'Logout', icon: 'log-out-outline' },
];

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  
  const profileData = {
    name: user?.name || 'User',
    email: user?.email || 'user@example.com',
    level: 'Platinum Partner',
    joinedDate: 'Jan 2024',
  };

  const handleOptionPress = (title: string) => {
    if (title === 'Logout') {
      logout();
    } else {
      console.log(`${title} clicked`);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-emerald-500">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header Section */}
        <View className="px-6 pt-10 pb-20 items-center">
          <View className="w-24 h-24 rounded-full bg-white items-center justify-center border-4 border-emerald-400">
            <Ionicons name="person" size={50} color={COLORS.primary} />
          </View>
          <Text className="text-white text-2xl font-bold mt-4">{profileData.name}</Text>
          <Text className="text-emerald-100">{profileData.email}</Text>
          
          <View className="bg-emerald-400/30 px-4 py-1 rounded-full mt-3">
            <Text className="text-white font-semibold text-xs tracking-wider">
              {profileData.level.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Info Cards */}
        <View className="bg-gray-50 rounded-t-[40px] px-4 pt-8 mt-[-40] min-h-[500px]">
          {OPTIONS.map((item) => (
            <ProfileOptionItem 
              key={item.id} 
              item={item} 
              onPress={() => handleOptionPress(item.title)} 
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
