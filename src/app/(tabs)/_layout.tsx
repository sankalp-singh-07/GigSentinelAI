import { Tabs } from "expo-router";
import { Text, View } from "react-native";

type TabIconProps = {
  icon: string;
  label: string;
  focused: boolean;
};

function TabIcon({ icon, label, focused }: TabIconProps) {
  return (
    <View className="items-center justify-center pt-2">
      <Text className={`text-xl ${focused ? "" : "opacity-50"}`}>{icon}</Text>
      <Text
        className={`text-[10px] mt-1 ${focused ? "text-indigo-400 font-semibold" : "text-gray-500"
          }`}
      >
        {label}
      </Text>
    </View>
  );
}

// import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#111827",
          borderTopWidth: 0,
          height: 75,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
          paddingBottom: 10,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}