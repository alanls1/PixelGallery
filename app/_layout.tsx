import NavBar from "@/components/Navbar";
import { store } from "@/hooks/redux";
import { LoginUser } from "@/hooks/useLoginUser";
import { Stack, usePathname } from "expo-router";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

export default function RootLayout() {
  const pathname = usePathname();

  const showNavBar = pathname !== "/login" && pathname !== "/register";

  const queryClient = new QueryClient();

  return (
    <LoginUser>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <View style={{ flex: 1 }}>
            {showNavBar && <NavBar />}
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="album" options={{ headerShown: false }} />
              <Stack.Screen name="photos" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="register" options={{ headerShown: false }} />
            </Stack>
          </View>
        </Provider>
      </QueryClientProvider>
    </LoginUser>
  );
}
