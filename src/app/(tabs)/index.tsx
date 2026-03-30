import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const quickActions = [
  { icon: "📊", title: "Analytics", subtitle: "View insights" },
  { icon: "🛡️", title: "Security", subtitle: "Check status" },
  { icon: "📋", title: "Tasks", subtitle: "3 pending" },
  { icon: "💬", title: "Messages", subtitle: "5 new" },
];

const recentActivity = [
  { icon: "🟢", title: "System scan completed", time: "2 min ago" },
  { icon: "🔵", title: "New update available", time: "15 min ago" },
  { icon: "🟡", title: "Backup in progress", time: "1 hr ago" },
  { icon: "🟢", title: "Security check passed", time: "3 hrs ago" },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <Text className="text-gray-400 text-sm">Welcome back</Text>
          <Text className="text-white text-3xl font-bold mt-1">
            GigSentinel AI
          </Text>
        </View>

        {/* Status Card */}
        <View className="mx-6 bg-indigo-600 rounded-2xl p-5 mb-6">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-indigo-200 text-sm">System Status</Text>
              <Text className="text-white text-2xl font-bold mt-1">
                All Clear
              </Text>
              <Text className="text-indigo-200 text-sm mt-1">
                Last checked: Just now
              </Text>
            </View>
            <View className="bg-indigo-500 rounded-full w-16 h-16 items-center justify-center">
              <Text className="text-3xl">✅</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mb-6">
          <Text className="text-white text-lg font-semibold mb-3">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {quickActions.map((action, index) => (
              <Pressable
                key={index}
                className="bg-slate-800 rounded-xl p-4 flex-1 min-w-[45%] border border-slate-700"
              >
                <Text className="text-2xl mb-2">{action.icon}</Text>
                <Text className="text-white font-semibold">{action.title}</Text>
                <Text className="text-gray-400 text-sm">{action.subtitle}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View className="px-6 mb-8">
          <Text className="text-white text-lg font-semibold mb-3">
            Recent Activity
          </Text>
          <View className="bg-slate-800 rounded-xl border border-slate-700">
            {recentActivity.map((item, index) => (
              <View
                key={index}
                className={`flex-row items-center p-4 ${
                  index < recentActivity.length - 1
                    ? "border-b border-slate-700"
                    : ""
                }`}
              >
                <Text className="text-lg mr-3">{item.icon}</Text>
                <View className="flex-1">
                  <Text className="text-white font-medium">{item.title}</Text>
                  <Text className="text-gray-500 text-xs mt-0.5">
                    {item.time}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
