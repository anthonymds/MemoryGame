import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { Baloo2_800ExtraBold, Baloo2_600SemiBold, Baloo2_700Bold } from '@expo-google-fonts/baloo-2';

export default function RootLayout() {
  const [loaded] = useFonts({
    BalooExtraBold: Baloo2_800ExtraBold,
    BalooSemiBold: Baloo2_600SemiBold,
    BalooBold: Baloo2_700Bold
  });

  if (!loaded) {
    return null;
  }
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}