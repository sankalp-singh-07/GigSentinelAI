import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = [
  { icon: "🤖", name: "AI Tools", count: 12 },
  { icon: "🔒", name: "Security", count: 8 },
  { icon: "📈", name: "Analytics", count: 15 },
  { icon: "🔧", name: "Utilities", count: 6 },
  { icon: "🌐", name: "Network", count: 9 },
  { icon: "💾", name: "Storage", count: 4 },
];

const featured = [
  {
    icon: "⚡",
    title: "Smart Threat Detection",
    description: "AI-powered real-time threat analysis and prevention",
    tag: "Popular",
  },
  {
    icon: "🔐",
    title: "Encryption Suite",
    description: "End-to-end encryption for all your sensitive data",
    tag: "New",
  },
  {
    icon: "📡",
    title: "Network Monitor",
    description: "Real-time network traffic analysis and alerts",
    tag: "Updated",
  },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4 pb-4">
          <Text className="text-white text-3xl font-bold">Explore</Text>
          <Text className="text-gray-400 text-sm mt-1">
            Discover tools and features
          </Text>
        </View>

        {/* Search Bar */}
        <View className="px-6 mb-6">
          <View className="bg-slate-800 rounded-xl flex-row items-center px-4 border border-slate-700">
            <Text className="text-gray-400 mr-2">🔍</Text>
            <TextInput
              placeholder="Search features..."
              placeholderTextColor="#64748b"
              className="flex-1 text-white py-3.5"
            />
          </View>
        </View>

        {/* Categories */}
        <View className="px-6 mb-6">
          <Text className="text-white text-lg font-semibold mb-3">
            Categories
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-3">
              {categories.map((cat, index) => (
                <Pressable
                  key={index}
                  className="bg-slate-800 rounded-xl px-4 py-3 items-center border border-slate-700 min-w-[90px]"
                >
                  <Text className="text-2xl mb-1">{cat.icon}</Text>
                  <Text className="text-white text-xs font-medium">
                    {cat.name}
                  </Text>
                  <Text className="text-gray-500 text-[10px] mt-0.5">
                    {cat.count} items
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Featured */}
        <View className="px-6 mb-8">
          <Text className="text-white text-lg font-semibold mb-3">
            Featured
          </Text>
          <View className="gap-3">
            {featured.map((item, index) => (
              <Pressable
                key={index}
                className="bg-slate-800 rounded-xl p-4 flex-row items-center border border-slate-700"
              >
                <View className="bg-slate-700 rounded-lg w-12 h-12 items-center justify-center mr-4">
                  <Text className="text-2xl">{item.icon}</Text>
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center gap-2">
                    <Text className="text-white font-semibold">
                      {item.title}
                    </Text>
                    <View className="bg-indigo-600/30 rounded-full px-2 py-0.5">
                      <Text className="text-indigo-400 text-[10px] font-medium">
                        {item.tag}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-gray-400 text-sm mt-1">
                    {item.description}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
