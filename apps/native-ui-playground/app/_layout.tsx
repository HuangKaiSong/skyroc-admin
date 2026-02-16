import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack , useNavigationContainerRef, Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { useColorScheme } from '@/hooks/use-color-scheme';
import "../global.css"
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const navigationRef = useNavigationContainerRef();

  useReactNavigationDevTools(navigationRef);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { flex: 1 },
          animationMatchesGesture: true,
          animation: 'slide_from_right',
          orientation:'portrait'
        }}
      >
        <Slot />
      </Stack>
      <StatusBar animated style="auto" />
    </ThemeProvider>
  );
}
