import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
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
  const handleOptionPress = (title: string) => {
    if (title === 'Logout') {
      console.log('Logout clicked');
    } else {
      console.log(`${title} clicked`);
    }
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-green-500">
      
      {/* ── Header ── */}
      <View className="px-4 pt-6 pb-16 flex-row justify-between items-center">
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>

        <Text className="text-white text-lg font-extrabold">
          Profile
        </Text>

        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/notifications' as any)}>
          <Ionicons name="notifications" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* ── Profile Main Section ── */}
      <View className="flex-1 bg-gray-50 rounded-t-[40px] px-4 pt-4 mt-2">
        
        {/* Avatar + Name Wrapper (Pushed Up) */}
        <View className="items-center -mt-16 mb-6">
          <View className="relative">
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
              className="w-24 h-24 rounded-full border-4 border-white bg-gray-200"
            />
            {/* Small green badge */}
            <View className="absolute bottom-1 right-0 bg-green-500 rounded-full w-6 h-6 items-center justify-center border-2 border-white">
               <Ionicons name="id-card" size={12} color="#fff" />
            </View>
          </View>

          <Text className="text-gray-900 text-xl font-extrabold mt-3">Ben Adams</Text>
          <Text className="text-gray-500 text-sm font-medium mt-0.5">ID: 21301234</Text>
        </View>

        {/* ── Options List ── */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {OPTIONS.map((item) => (
            <ProfileOptionItem 
              key={item.id} 
              item={item} 
              onPress={() => handleOptionPress(item.title)} 
            />
          ))}
        </ScrollView>
        
      </View>
    </SafeAreaView>
  );
}
