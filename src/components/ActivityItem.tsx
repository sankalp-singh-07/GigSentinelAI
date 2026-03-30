import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';

interface ActivityItemProps {
  icon: string;
  title: string;
  subtitle: string;
  amount: string;
  isLast?: boolean;
}

export default function ActivityItem({ icon, title, subtitle, amount, isLast }: ActivityItemProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: Colors.primaryDark,
      }}
    >
      {/* Icon circle */}
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: Colors.bgCardLight,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
          borderWidth: 1,
          borderColor: Colors.primaryDark,
        }}
      >
        <Ionicons
          name={icon as any}
          size={22}
          color={Colors.primary}
        />
      </View>

      {/* Title + subtitle */}
      <View style={{ flex: 1 }}>
        <Text style={{ color: Colors.textWhite, fontSize: 14, fontWeight: '600' }}>{title}</Text>
        <Text style={{ color: Colors.primary, fontSize: 12, marginTop: 2 }}>{subtitle}</Text>
      </View>

      {/* Amount */}
      <Text style={{ color: Colors.amountGreen, fontSize: 15, fontWeight: '700' }}>{amount}</Text>
    </View>
  );
}
