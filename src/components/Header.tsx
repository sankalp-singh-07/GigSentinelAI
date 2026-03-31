import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { COLORS } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  name: string;
}

export default function Header({ name }: HeaderProps) {
  const { user } = useAuth();
  const displayName = user?.name || name;

  return (
    <View className="px-4 pt-4 pb-2 flex-row justify-between items-center">
      <View>
        <Text className="text-emerald-100 text-sm font-medium">Welcome back,</Text>
        <Text className="text-white text-3xl font-extrabold">{displayName}</Text>
      </View>
      <TouchableOpacity 
        className="w-12 h-12 bg-white/20 rounded-full items-center justify-center border border-white/30"
        onPress={() => router.push('/notifications' as any)}
        activeOpacity={0.7}
      >
        <Ionicons name="notifications-outline" size={24} color="white" />
        <View className="absolute top-2.5 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-emerald-500" />
      </TouchableOpacity>
    </View>
  );
}
