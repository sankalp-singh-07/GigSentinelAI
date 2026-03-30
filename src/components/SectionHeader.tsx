import React from 'react';
import { View, Text } from 'react-native';

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <View style={{ paddingVertical: 12, paddingHorizontal: 4, marginTop: 8 }}>
      <Text style={{ color: '#374151', fontSize: 13, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase' }}>
        {title}
      </Text>
    </View>
  );
}
