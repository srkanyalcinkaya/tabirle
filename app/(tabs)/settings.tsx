import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
    return (
        <View className="flex-1 bg-[#A82A00] items-center relative  pb-5">
            <Image source={require("@/assets/images/dec-2.png")} className="object-cover absolute z-[1]" />
            <Image source={require("@/assets/images/dec-1.png")} className="object-cover absolute z-[2]" />
            <Image source={require("@/assets/images/stars.png")} className="object-center absolute z-[3]" />
            <SafeAreaView className="abolsute z-10 flex-1 w-full px-5">
                <Text>
                    Home
                </Text>
            </SafeAreaView>
            <StatusBar style="light" />
        </View>
    )
}