import { Stack } from 'expo-router';
import { SIM_COLORS } from '../../constants/simulation';

export default function SimulateLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: { backgroundColor: SIM_COLORS.gradientTop },
      }}
    />
  );
}
