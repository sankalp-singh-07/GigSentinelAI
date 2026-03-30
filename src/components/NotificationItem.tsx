import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';

export interface NotificationData {
  id: string;
  type: 'risk' | 'claim' | 'income' | 'update';
  title: string;
  description: string;
  amount?: string;
  date: string;
  read: boolean;
}

interface NotificationItemProps {
  item: NotificationData;
  onPress?: () => void;
}

const ICON_MAP = {
  risk:   { name: 'alert-outline' as const,     color: '#b91c1c', bg: '#fee2e2' },
  claim:  { name: 'cash-outline' as const,      color: '#15803d', bg: '#dcfce7' },
  income: { name: 'trending-down-outline' as const, color: '#b45309', bg: '#fef3c7' },
  update: { name: 'analytics-outline' as const, color: '#1d4ed8', bg: '#dbeafe' },
};

export default function NotificationItem({ item, onPress }: NotificationItemProps) {
  const iconConfig = ICON_MAP[item.type];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: item.read ? '#f0fdf4' : '#dcfce7', // Slightly darker if unread
        padding: 16,
        marginBottom: 12,
        borderRadius: 16,
        borderWidth: item.read ? 1 : 1.5,
        borderColor: item.read ? '#bbf7d0' : '#86efac',
      }}
    >
      <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
        {/* Left: Circular Icon */}
        <View
          style={{
            width: 46,
            height: 46,
            borderRadius: 23,
            backgroundColor: iconConfig.bg,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 14,
          }}
        >
          <Ionicons name={iconConfig.name} size={22} color={iconConfig.color} />
        </View>

        {/* Center: Title & Description */}
        <View style={{ flex: 1, paddingRight: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={{ color: '#1f2937', fontSize: 16, fontWeight: item.read ? '600' : '700' }}>
              {item.title}
            </Text>
            {!item.read && (
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#ef4444' }} />
            )}
          </View>
          <Text style={{ color: '#4b5563', fontSize: 13, marginTop: 3, lineHeight: 18 }}>
            {item.description}
          </Text>
        </View>
      </View>

      {/* Right: Amount & Date */}
      <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
        {item.amount && (
          <Text style={{ color: item.amount.startsWith('+') ? '#15803d' : '#374151', fontSize: 15, fontWeight: '700' }}>
            {item.amount}
          </Text>
        )}
        <Text style={{ color: '#9ca3af', fontSize: 11, fontWeight: '500', marginTop: item.amount ? 4 : 0 }}>
          {item.date}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
