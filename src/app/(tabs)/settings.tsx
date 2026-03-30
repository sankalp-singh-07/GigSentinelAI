import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/theme';

export default function LayersScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgDark }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: '700' }}>Layers</Text>
        <Text style={{ color: Colors.textMuted, fontSize: 13, marginTop: 6 }}>Coming soon…</Text>
      </View>
    </SafeAreaView>
  );
}
