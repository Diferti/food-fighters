import "./global.css"
import {Redirect, SplashScreen, Stack} from "expo-router";
import { useFonts} from "expo-font";
import {useEffect, useState} from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'LuckiestGuy-Regular': require('../assets/fonts/Luckiest_Guy/LuckiestGuy-Regular.ttf'),
    'BarlowSemiCondensed-Thin': require('@/assets/fonts/Barlow_Semi_Condensed/BarlowSemiCondensed-Thin.ttf'),
    'BarlowSemiCondensed-ExtraLight': require('@/assets/fonts/Barlow_Semi_Condensed/BarlowSemiCondensed-ExtraLight.ttf'),
    'BarlowSemiCondensed-Light': require('@/assets/fonts/Barlow_Semi_Condensed/BarlowSemiCondensed-Light.ttf'),
    'BarlowSemiCondensed-Regular': require('@/assets/fonts/Barlow_Semi_Condensed/BarlowSemiCondensed-Regular.ttf'),
    'BarlowSemiCondensed-Medium': require('@/assets/fonts/Barlow_Semi_Condensed/BarlowSemiCondensed-Medium.ttf'),
    'BarlowSemiCondensed-SemiBold': require('@/assets/fonts/Barlow_Semi_Condensed/BarlowSemiCondensed-SemiBold.ttf'),
    'BarlowSemiCondensed-Bold': require('@/assets/fonts/Barlow_Semi_Condensed/BarlowSemiCondensed-Bold.ttf'),
    'BarlowSemiCondensed-ExtraBold': require('@/assets/fonts/Barlow_Semi_Condensed/BarlowSemiCondensed-ExtraBold.ttf'),
    'BarlowSemiCondensed-Black': require('@/assets/fonts/Barlow_Semi_Condensed/BarlowSemiCondensed-Black.ttf'),
  });

  const [isAuthenticated] = useState(false);

  useEffect(()=> {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
      <Stack screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
            <>
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(registration)" />
              <Stack.Screen name="index" />
            </>
        ) : (
            <Redirect href="/(tabs)/main" />
        )}
      </Stack>
  );
}
