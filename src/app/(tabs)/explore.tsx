import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');

export default function ExploreScreen() {
  return (
    <SafeAreaView className="flex-1 bg-emerald-500">
      <View className="px-6 py-4 flex-row justify-between items-center">
        <Text className="text-white text-2xl font-bold">Insights</Text>
        <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
          <Ionicons name="share-social-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Chart Card */}
        <View className="mx-4 mt-2 bg-white rounded-3xl p-5 shadow-xl">
          <Text className="text-gray-800 text-lg font-bold mb-1">Earnings Trend</Text>
          <Text className="text-gray-400 text-sm mb-6">Daily earnings vs. risk protection</Text>
          
          <LineChart
            data={{
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              datasets: [{
                data: [450, 600, 300, 800, 500, 900],
                color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
                strokeWidth: 3
              }]
            }}
            width={width - 72}
            height={200}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: "4", strokeWidth: "2", stroke: "#10B981" }
            }}
            bezier
            style={{ marginVertical: 8, borderRadius: 16 }}
          />
        </View>

        {/* Stats Grid */}
        <View className="flex-row px-4 mt-6 gap-4">
          <View className="flex-1 bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
            <Text className="text-emerald-600 font-bold text-xs mb-1">STABILITY</Text>
            <Text className="text-gray-900 text-xl font-extrabold">84%</Text>
          </View>
          <View className="flex-1 bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
            <Text className="text-emerald-600 font-bold text-xs mb-1">PROTECTED</Text>
            <Text className="text-gray-900 text-xl font-extrabold">₹3.4k</Text>
          </View>
        </View>

        {/* Summary Sections */}
        <View className="mx-4 mt-6 bg-white rounded-2xl p-5 shadow-md">
          <Text className="text-gray-800 font-bold mb-4">Top Risk Factors</Text>
          
          <View className="flex-row items-center mb-4">
            <View className="w-8 h-8 bg-red-50 rounded-full items-center justify-center">
              <Ionicons name="rainy-outline" size={16} color="#EF4444" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-gray-800 text-sm font-semibold">Unexpected Rain</Text>
              <View className="h-1.5 w-full bg-gray-100 rounded-full mt-1">
                <View className="h-full bg-red-400 rounded-full w-[65%]" />
              </View>
            </View>
            <Text className="ml-3 text-gray-500 text-xs font-bold">65%</Text>
          </View>

          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-orange-50 rounded-full items-center justify-center">
              <Ionicons name="bicycle-outline" size={16} color="#F59E0B" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-gray-800 text-sm font-semibold">Traffic Congestion</Text>
              <View className="h-1.5 w-full bg-gray-100 rounded-full mt-1">
                <View className="h-full bg-orange-400 rounded-full w-[40%]" />
              </View>
            </View>
            <Text className="ml-3 text-gray-500 text-xs font-bold">40%</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
