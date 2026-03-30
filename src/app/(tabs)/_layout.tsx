import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface TabConfig {
  name: string;
  icon: IoniconName;
  iconActive: IoniconName;
}

const TAB_CONFIGS: TabConfig[] = [
  { name: 'index',    icon: 'home-outline',             iconActive: 'home' },
  { name: 'explore',  icon: 'bar-chart-outline',        iconActive: 'bar-chart' },
  { name: 'profile',  icon: 'swap-horizontal-outline',  iconActive: 'swap-horizontal' },
  { name: 'settings', icon: 'layers-outline',           iconActive: 'layers' },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.navBg,
          borderTopColor: Colors.navBorder,
          borderTopWidth: 1,
          height: 68,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.tabInactive,
        tabBarShowLabel: false,
      }}
    >
      {TAB_CONFIGS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? tab.iconActive : tab.icon}
                size={24}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
