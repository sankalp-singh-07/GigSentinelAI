import { View, Text, ScrollView, Pressable, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

type ToggleItemProps = {
  icon: string;
  title: string;
  subtitle: string;
  value: boolean;
  onToggle: () => void;
};

function ToggleItem({ icon, title, subtitle, value, onToggle }: ToggleItemProps) {
  return (
    <View className="flex-row items-center p-4 border-b border-slate-700">
      <View className="bg-slate-700 rounded-lg w-10 h-10 items-center justify-center mr-3">
        <Text className="text-lg">{icon}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-white font-medium">{title}</Text>
        <Text className="text-gray-500 text-xs mt-0.5">{subtitle}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: "#334155", true: "#6366f1" }}
        thumbColor="#fff"
      />
    </View>
  );
}

const generalItems = [
  { icon: "🌍", title: "Language", value: "English" },
  { icon: "🕐", title: "Time Zone", value: "Auto" },
  { icon: "📱", title: "App Version", value: "1.0.0" },
];

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoScan, setAutoScan] = useState(true);
  const [biometric, setBiometric] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4 pb-4">
          <Text className="text-white text-3xl font-bold">Settings</Text>
          <Text className="text-gray-400 text-sm mt-1">
            Customize your experience
          </Text>
        </View>

        {/* Preferences */}
        <View className="px-6 mb-6">
          <Text className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Preferences
          </Text>
          <View className="bg-slate-800 rounded-xl border border-slate-700">
            <ToggleItem
              icon="🔔"
              title="Notifications"
              subtitle="Push notifications"
              value={notifications}
              onToggle={() => setNotifications(!notifications)}
            />
            <ToggleItem
              icon="🌙"
              title="Dark Mode"
              subtitle="Use dark theme"
              value={darkMode}
              onToggle={() => setDarkMode(!darkMode)}
            />
            <ToggleItem
              icon="🔄"
              title="Auto Scan"
              subtitle="Automatic security scans"
              value={autoScan}
              onToggle={() => setAutoScan(!autoScan)}
            />
            <View className="border-b-0">
              <ToggleItem
                icon="🔐"
                title="Biometric Lock"
                subtitle="Face ID / Fingerprint"
                value={biometric}
                onToggle={() => setBiometric(!biometric)}
              />
            </View>
          </View>
        </View>

        {/* General */}
        <View className="px-6 mb-6">
          <Text className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
            General
          </Text>
          <View className="bg-slate-800 rounded-xl border border-slate-700">
            {generalItems.map((item, index) => (
              <Pressable
                key={index}
                className={`flex-row items-center p-4 ${
                  index < generalItems.length - 1
                    ? "border-b border-slate-700"
                    : ""
                }`}
              >
                <View className="bg-slate-700 rounded-lg w-10 h-10 items-center justify-center mr-3">
                  <Text className="text-lg">{item.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white font-medium">{item.title}</Text>
                </View>
                <Text className="text-gray-500 text-sm">{item.value}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Danger Zone */}
        <View className="px-6 mb-8">
          <Text className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Account
          </Text>
          <View className="bg-slate-800 rounded-xl border border-slate-700">
            <Pressable className="flex-row items-center p-4 border-b border-slate-700">
              <View className="bg-slate-700 rounded-lg w-10 h-10 items-center justify-center mr-3">
                <Text className="text-lg">📤</Text>
              </View>
              <Text className="text-white font-medium flex-1">
                Export Data
              </Text>
            </Pressable>
            <Pressable className="flex-row items-center p-4">
              <View className="bg-red-900/30 rounded-lg w-10 h-10 items-center justify-center mr-3">
                <Text className="text-lg">🚪</Text>
              </View>
              <Text className="text-red-400 font-medium flex-1">
                Log Out
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
