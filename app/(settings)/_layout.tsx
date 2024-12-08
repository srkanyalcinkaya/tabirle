import { Stack } from "expo-router";

export const unstable_settings = {
    initialRouteName: "login",
};
export default function SettingsLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }} >
            <Stack.Screen name="login" />
            
        </Stack>
    )
}