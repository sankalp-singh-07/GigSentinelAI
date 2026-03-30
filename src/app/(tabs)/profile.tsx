import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const stats = [
  { label: "Scans", value: "142" },
  { label: "Threats", value: "0" },
  { label: "Uptime", value: "99.9%" },
];

const menuItems = [
  { icon: "👤", title: "Edit Profile", subtitle: "Update your information" },
  { icon: "🔔", title: "Notifications", subtitle: "Manage alerts" },
  { icon: "🔗", title: "Connected Devices", subtitle: "3 devices linked" },
  { icon: "📊", title: "Usage Stats", subtitle: "View detailed analytics" },
  { icon: "🎨", title: "Appearance", subtitle: "Theme & display" },
  { icon: "❓", title: "Help & Support", subtitle: "Get assistance" },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4 pb-2">
          <Text className="text-white text-3xl font-bold">Profile</Text>
        </View>

        {/* Avatar Card */}
        <View className="mx-6 mt-4 items-center">
          <View className="bg-indigo-600 rounded-full w-24 h-24 items-center justify-center mb-4">
            <Text className="text-4xl">👤</Text>
          </View>
          <Text className="text-white text-xl font-bold">User</Text>
          <Text className="text-gray-400 text-sm mt-1">user@gigsentinel.ai</Text>
          <View className="bg-emerald-600/20 rounded-full px-3 py-1 mt-2">
            <Text className="text-emerald-400 text-xs font-medium">
              Pro Plan
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row mx-6 mt-6 bg-slate-800 rounded-xl border border-slate-700 p-4">
          {stats.map((stat, index) => (
            <View
              key={index}
              className={`flex-1 items-center ${
                index < stats.length - 1 ? "border-r border-slate-700" : ""
              }`}
            >
              <Text className="text-white text-xl font-bold">{stat.value}</Text>
              <Text className="text-gray-400 text-xs mt-1">{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu Items */}
        <View className="mx-6 mt-6 mb-8 bg-slate-800 rounded-xl border border-slate-700">
          {menuItems.map((item, index) => (
            <Pressable
              key={index}
              className={`flex-row items-center p-4 ${
                index < menuItems.length - 1
                  ? "border-b border-slate-700"
                  : ""
              }`}
            >
              <View className="bg-slate-700 rounded-lg w-10 h-10 items-center justify-center mr-3">
                <Text className="text-lg">{item.icon}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">{item.title}</Text>
                <Text className="text-gray-500 text-xs mt-0.5">
                  {item.subtitle}
                </Text>
              </View>
              <Text className="text-gray-600">›</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
