
import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

const TabIcon: React.FC<{ color: string; name: string; focused: boolean, icon: any }> = ({ color, name, focused, icon }) => {
    return (
        <View className="flex items-center justify-center pt-4 gap-2">
            <Image
                source={icon}
                resizeMode="contain"
                className={`w-9 h-9`}
            />
            {/* <Text
                className={`${focused ? "text-sm " : "text-xs"}  font-aregular `}
                style={{ color: color }}
            >
                {name}
            </Text> */}
        </View>
    );
};
export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "#C8C8C8",
                tabBarStyle: {
                    backgroundColor: "#C43100",
                    height: 84,
                },
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={focused ? icons.home : icons["home-outline"]} color={color} focused={focused} name="Home" />
                    ),
                }}
            />
            <Tabs.Screen
                name="horoscope"
                options={{
                    title: 'Astrology',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={focused ? icons.compatibility : icons["compatibility-outline"]} color={color} focused={focused} name="Astrology" />
                    ),
                }}
            />
            <Tabs.Screen
                name="interpretation"
                options={{
                    title: 'Interpretation',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={icons.tabirle} color={color} focused={focused} name="Interpretation" />
                    ),
                }}
            />
            <Tabs.Screen
                name="tarot"
                options={{
                    title: 'Tarot',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={focused ? icons.tarot : icons["tarot-outline"]} color={color} focused={focused} name="Tarot Card" />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={focused ? icons.user : icons["user-outline"]} color={color} focused={focused} name="Home" />
                    ),
                }}

            />
        </Tabs>
    )
}