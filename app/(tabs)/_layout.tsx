import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Stack, Tabs } from "expo-router";


export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,

            }} initialRouteName="Home">
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="horoscope"
                options={{
                    title: 'Astrology',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'star' : 'star-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="interpretation"
                options={{
                    title: 'Interpretation',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'folder-open' : 'folder-open-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
                    ),
                }}
                
            />
        </Tabs>
    )
}