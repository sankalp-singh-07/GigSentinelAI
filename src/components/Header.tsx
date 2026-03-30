import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '../constants/theme';

interface HeaderProps {
  name: string;
}

export default function Header({ name }: HeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
      <View>
        <Text style={{ color: Colors.textWhite, fontSize: 22, fontWeight: '700' }}>
          Hi, {name} 👋
        </Text>
        <Text style={{ color: Colors.textMuted, fontSize: 13, marginTop: 2 }}>
          You&apos;re protected today
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: 42,
          height: 42,
          borderRadius: 21,
          backgroundColor: Colors.bgCardLight,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => router.push('/notifications' as any)}
        activeOpacity={0.7}
      >
        <Ionicons name="notifications-outline" size={20} color={Colors.textWhite} />
      </TouchableOpacity>
    </View>
  );
}
