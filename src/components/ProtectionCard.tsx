import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';

interface ProtectionCardProps {
  plan: string;
  protectedAmount: string;
  potentialLoss: string;
}

export default function ProtectionCard({ plan, protectedAmount, potentialLoss }: ProtectionCardProps) {
  return (
    <View
      style={{
        marginHorizontal: 16,
        marginTop: 14,
        backgroundColor: Colors.bgCardLight,
        borderRadius: 20,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.primary,
      }}
    >
      {/* LEFT — Coverage Active */}
      <View style={{ flex: 1, alignItems: 'center', paddingRight: 12 }}>
        {/* Circular icon */}
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            borderWidth: 3,
            borderColor: Colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
            backgroundColor: Colors.primaryDark,
          }}
        >
          <Ionicons name="shield-checkmark" size={28} color={Colors.primary} />
        </View>
        <Text style={{ color: Colors.textWhite, fontSize: 13, fontWeight: '700' }}>
          Coverage Active ✅
        </Text>
        <Text style={{ color: Colors.textMuted, fontSize: 12, marginTop: 2 }}>
          Plan: {plan}
        </Text>
      </View>

      {/* Vertical divider */}
      <View style={{ width: 1, backgroundColor: Colors.primaryDark, alignSelf: 'stretch', marginHorizontal: 4 }} />

      {/* RIGHT — Protected Amount & Loss */}
      <View style={{ flex: 1, paddingLeft: 12, gap: 14 }}>
        {/* Protected Amount */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              backgroundColor: Colors.primaryDark,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="cash-outline" size={18} color={Colors.primary} />
          </View>
          <View>
            <Text style={{ color: Colors.textMuted, fontSize: 10, fontWeight: '600' }}>Protected Amount</Text>
            <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: '800' }}>{protectedAmount}</Text>
          </View>
        </View>

        {/* Potential Loss */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              backgroundColor: '#3d1515',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="trending-down-outline" size={18} color="#f87171" />
          </View>
          <View>
            <Text style={{ color: Colors.textMuted, fontSize: 10, fontWeight: '600' }}>Potential Loss Today</Text>
            <Text style={{ color: '#f87171', fontSize: 18, fontWeight: '800' }}>{potentialLoss}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
