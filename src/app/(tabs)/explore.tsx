import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const CHART_DATA = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [8, 3, 7, 5, 9, 2, 7.5],
    },
  ],
};

const FILTER_TABS = ['Daily', 'Weekly', 'Monthly', 'Year'];

export default function InsightsScreen() {
  const [activeTab, setActiveTab] = useState('Daily');

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-[#11B88A]">
      
      {/* ── HEADER ── */}
      <View className="px-4 pt-4 pb-6 flex-row justify-between items-center">
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>

        <Text className="text-white text-lg font-extrabold tracking-wide">
          Risk & Earnings Insights
        </Text>

        <TouchableOpacity 
          activeOpacity={0.7} 
          onPress={() => router.push('/notifications' as any)}
          className="bg-white rounded-full p-1.5"
        >
          <Ionicons name="notifications-outline" size={20} color="#11B88A" />
        </TouchableOpacity>
      </View>

      {/* ── TOP CONTENT: EARNINGS & RISK ── */}
      <View className="px-4 mb-6">
        {/* Earnings Row */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-gray-900 font-bold text-xs mb-1">Expected Earnings</Text>
            <Text className="text-white text-3xl font-extrabold tracking-tight">₹900.00</Text>
          </View>
          <View className="w-px h-12 bg-white/40 shadow-sm" />
          <View>
            <Text className="text-gray-900 font-bold text-xs mb-1">Actual Earnings</Text>
            <Text className="text-blue-500 text-3xl font-extrabold tracking-tight">₹500.40</Text>
          </View>
        </View>

        {/* Risk Trend Badge */}
        <View className="flex-row items-center mb-3">
          <View className="bg-gray-900 rounded-l-full px-4 py-1.5 z-10">
            <Text className="text-white text-xs font-semibold">Weekly Risk Trend</Text>
          </View>
          <View className="bg-white rounded-full px-5 py-1.5 -ml-4 shadow-sm z-20">
            <Text className="text-gray-800 text-xs font-bold italic">Increasing</Text>
          </View>
        </View>

        {/* Subtext */}
        <View className="flex-row items-center">
          <View className="w-1.5 h-1.5 bg-gray-900 mr-2 ml-1" />
          <Text className="text-gray-900 font-medium text-sm">
            Higher Disruption Probability This Week
          </Text>
        </View>
      </View>

      {/* ── MAIN WHITE CONTAINER ── */}
      <View className="flex-1 bg-white rounded-t-[40px] px-5 pt-6 shadow-xl">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          
          {/* TABS */}
          <View className="flex-row justify-between bg-white rounded-full p-1 mb-6 border border-gray-100 shadow-sm" style={{ elevation: 2 }}>
            {FILTER_TABS.map(tab => (
              <TouchableOpacity
                key={tab}
                activeOpacity={0.7}
                onPress={() => setActiveTab(tab)}
                className={`py-2 px-4 rounded-full ${activeTab === tab ? 'bg-[#11B88A]' : 'bg-transparent'}`}
              >
                <Text className={`font-semibold text-sm ${activeTab === tab ? 'text-white' : 'text-gray-500'}`}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* CHART */}
          <View className="bg-green-50 rounded-3xl p-4 mb-6 relative">
            <View className="flex-row justify-between items-center mb-4 z-10">
              <Text className="text-gray-800 font-bold ml-1">Earnings Vs Risk Impact</Text>
              <View className="flex-row gap-2">
                <View className="bg-[#11B88A] w-8 h-8 rounded-full items-center justify-center shadow-sm">
                  <Ionicons name="search" size={16} color="white" />
                </View>
                <View className="bg-[#11B88A] w-8 h-8 rounded-full items-center justify-center shadow-sm">
                  <Ionicons name="calendar" size={16} color="white" />
                </View>
              </View>
            </View>

            <BarChart
              data={CHART_DATA}
              width={screenWidth - 72}
              height={180}
              yAxisLabel=""
              yAxisSuffix="k"
              fromZero={true}
              chartConfig={{
                backgroundColor: 'transparent',
                backgroundGradientFrom: '#f0fdf4',
                backgroundGradientTo: '#f0fdf4',
                fillShadowGradientFrom: '#3b82f6',
                fillShadowGradientFromOpacity: 1,
                fillShadowGradientTo: '#22c55e',
                fillShadowGradientToOpacity: 1,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
                barPercentage: 0.5,
                propsForLabels: { fontSize: 10, fontWeight: '600' },
                propsForBackgroundLines: {
                  strokeDasharray: "4",
                  stroke: "rgba(156, 163, 175, 0.3)",
                }
              }}
              style={{ paddingRight: 0, paddingLeft: -10, alignSelf: 'center' }}
              withInnerLines={true}
              showBarTops={false}
              showValuesOnTopOfBars={false}
            />
          </View>

          {/* STATS SUMMARY */}
          <View className="flex-row justify-between mb-6">
            {/* Total Protected Card */}
            <View className="bg-white rounded-3xl w-[48%] items-center py-5 border border-gray-100 shadow-sm" style={{ elevation: 2 }}>
              <View className="w-10 h-10 rounded-xl bg-green-50 items-center justify-center mb-2 border border-green-100">
                <Ionicons name="trending-up" size={20} color="#11B88A" />
              </View>
              <Text className="text-gray-900 font-semibold text-xs mb-1">Total Protected</Text>
              <Text className="text-gray-900 font-extrabold text-xl">₹1,420</Text>
            </View>
            
            {/* Total Loss Prevented Card */}
            <View className="bg-white rounded-3xl w-[48%] items-center py-5 border border-gray-100 shadow-sm" style={{ elevation: 2 }}>
              <View className="w-10 h-10 rounded-xl bg-blue-50 items-center justify-center mb-2 border border-blue-100">
                <Ionicons name="trending-down" size={20} color="#3b82f6" />
              </View>
              <Text className="text-gray-900 font-semibold text-xs mb-1">Total Loss Prevented</Text>
              <Text className="text-blue-500 font-extrabold text-xl">₹620</Text>
            </View>
          </View>

          {/* SMART INSIGHTS */}
          <Text className="text-gray-800 font-bold mb-4 ml-1">Smart Insights</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="overflow-visible pb-4">
            <View className="bg-blue-50 rounded-3xl p-5 w-60 mr-4 border border-blue-100 shadow-sm">
              <View className="bg-blue-100 w-8 h-8 rounded-full items-center justify-center mb-3">
                <Ionicons name="rainy-outline" size={18} color="#2563eb" />
              </View>
              <Text className="text-blue-700 font-semibold text-sm leading-5">
                Rain caused highest losses this week (+₹850 covered).
              </Text>
            </View>
            <View className="bg-[#ecfdf5] rounded-3xl p-5 w-60 mr-4 border border-[#d1fae5] shadow-sm">
              <View className="bg-[#d1fae5] w-8 h-8 rounded-full items-center justify-center mb-3">
                <Ionicons name="cash-outline" size={18} color="#059669" />
              </View>
              <Text className="text-green-700 font-semibold text-sm leading-5">
                Friday had maximum claims processed seamlessly.
              </Text>
            </View>
          </ScrollView>

        </ScrollView>
      </View>
      
    </SafeAreaView>
  );
}
