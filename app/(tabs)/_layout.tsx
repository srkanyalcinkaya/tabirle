import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";
import { Image, Text, View, Platform } from "react-native";

const TabIcon: React.FC<{ color: string; name: string; focused: boolean; icon: keyof typeof icons }> = ({ color, name, focused, icon }) => {
    return (
        <View className={`flex items-center justify-center ${Platform.OS === "ios" ? "pt-4" : "pt-0"}  `}>
            {/* <Image
                source={icon}
                resizeMode="contain"
                className={`${focused ? "w-11 h-11" : "w-9 h-9"} `}
            /> */}
            {icons[icon]}
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
                    height: 80,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    position: "absolute",
                    borderTopWidth: 0,
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center"

                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        // <TabIcon icon={focused ? icons.home : icons["home-outline"]} color={color} focused={focused} name="Home" />
                        <TabIcon icon={focused ? "home" : "home-outline"} color={color} focused={focused} name="Home" />
                    ),
                }}
            />
            <Tabs.Screen
                name="horoscope"
                options={{
                    title: 'Astrology',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={focused ? "compatibility" : "compatibility-outline"} color={color} focused={focused} name="Astrology" />
                    ),
                }}
            />
            <Tabs.Screen
                name="interpretation"
                options={{
                    title: 'Interpretation',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={"tabirle"} color={color} focused={focused} name="Interpretation" />
                    ),
                }}
            />
            <Tabs.Screen
                name="tarot"
                options={{
                    title: 'Tarot',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={focused ? "tarot" : "tarot-outline"} color={color} focused={focused} name="Tarot Card" />
                    ),
                }}
            />
            <Tabs.Screen
                name="astrology"
                options={{
                    title: 'Astrology',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={focused ? "astrology" : "astrology-outline"} color={color} focused={focused} name="Home" />
                    ),
                }}

            />
        </Tabs>
    )
}