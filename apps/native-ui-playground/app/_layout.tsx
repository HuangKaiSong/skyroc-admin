import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { registerImageComponent, ToastHost } from '@skyroc/native-ui';
import { Stack , useNavigationContainerRef, Slot } from 'expo-router';
import { Image as ExpoImage } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { useColorScheme } from '@/hooks/use-color-scheme';
import "../global.css"
import { styled } from 'nativewind';
import { View } from 'react-native';

const RTImage=styled(ExpoImage)

registerImageComponent(RTImage);

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const navigationRef = useNavigationContainerRef();

  useReactNavigationDevTools(navigationRef);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View className="flex-1">
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

        <ToastHost />
      </View>
    </ThemeProvider>
  );
}
