import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '../constants/theme';

interface EarningsCardProps {
  expected: string;
  today: string;
}

export default function EarningsCard({ expected, today }: EarningsCardProps) {
  return (
    <View
      style={{
        marginHorizontal: 16,
        marginTop: 12,
        backgroundColor: Colors.bgCard,
        borderRadius: 16,
        flexDirection: 'row',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.primaryDark,
      }}
    >
      {/* Expected Earnings */}
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ color: Colors.textMuted, fontSize: 11, fontWeight: '600', letterSpacing: 0.5 }}>
          Expected Earnings
        </Text>
        <Text style={{ color: Colors.textWhite, fontSize: 26, fontWeight: '800', marginTop: 4 }}>
          {expected}
        </Text>
      </View>

      {/* Divider */}
      <View style={{ width: 1, backgroundColor: Colors.primaryDark, marginVertical: 12 }} />

      {/* Today's Earnings */}
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ color: Colors.textMuted, fontSize: 11, fontWeight: '600', letterSpacing: 0.5 }}>
          Today&apos;s Earnings
        </Text>
        <Text style={{ color: Colors.primary, fontSize: 26, fontWeight: '800', marginTop: 4 }}>
          {today}
        </Text>
      </View>
    </View>
  );
}
