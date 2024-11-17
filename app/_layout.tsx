import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "./global.css";
import { useColorScheme } from '@/hooks/useColorScheme';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
  initialRouteName: "/(auth)/login",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    "Pacifico-Regular": require('../assets/fonts/Pacifico-Regular.ttf'),
    "ArefRuqaa-Bold": require('../assets/fonts/ArefRuqaa-Bold.ttf'),
    "ArefRuqaa-Regular": require('../assets/fonts/ArefRuqaa-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded) {
    return null;
  }

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>

        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="interpretation/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="horoscope/[id]" options={{ headerShown: false }} />
        </Stack>

      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
