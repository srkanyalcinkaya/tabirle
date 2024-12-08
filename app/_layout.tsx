import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "./global.css";
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import "@/lang/i18n"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
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
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>

          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(settings)" options={{ headerShown: false }} />
            <Stack.Screen name="interpretation/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="horoscope/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="astrology/[id]" options={{ headerShown: false }} />
          </Stack>

        </GestureHandlerRootView>
      </ThemeProvider>
    </Provider>
  );
}
