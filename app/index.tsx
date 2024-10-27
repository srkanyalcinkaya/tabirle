import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Onboarding() {
    return (
        <View>
            <Text className="text-3xl bg-rose-500 p-4">
                Onboarding
            </Text>
            <Link href="/(tabs)/home">
                Go to About screen
            </Link>
        </View>
    )
}