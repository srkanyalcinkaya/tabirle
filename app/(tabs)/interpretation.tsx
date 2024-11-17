import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
export default function Index() {

    const [value, onChangeText] = useState('Useless Multiline Placeholder');
    return (
        <View className="flex-1 bg-[#A82A00] items-center relative  pb-5">
            <Image source={require("@/assets/images/dec-2.png")} className="object-cover absolute z-[1]" />
            <Image source={require("@/assets/images/dec-1.png")} className="object-cover absolute z-[2]" />
            <Image source={require("@/assets/images/stars.png")} className="object-center absolute z-[3]" />
            <SafeAreaView className="abolsute z-10 flex-1 w-full px-5">
                <Text className="text-white text-2xl font-abold text-center mb-5">Interpreatation</Text>

                <View className="flex-row items-center justify-center absolute top-[60] right-6 gap-x-2">
                    <Text className="text-[#DAA520] text-2xl font-aregular">
                        1000
                    </Text>
                    <MaterialCommunityIcons name="gold" size={28} color="#DAA520" />
                </View>

                <View className="relative h-96 w-full bg-[#FDC11C] rounded-2xl mt-5">
                    <TextInput
                        editable
                        multiline
                        numberOfLines={4}
                        maxLength={1000}
                        onChangeText={text => onChangeText(text)}
                        value={value}
                        className="w-full h-full px-4 pt-4 pb-8 font-aregular text-[#A82A00] text-xl "
                    />
                    <Text className="text-sm font-aregular absolute bottom-2 right-2">
                        {value.length} / 1000
                    </Text>
                </View>

                <TouchableOpacity onPress={() => { }} className={`bg-[#DAA520] p-4 rounded-2xl w-full mt-4`}>
                    <Text className="text-[#8C2F00] text-xl font-aregular text-center  ">Dream Interpretations</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <StatusBar style="light" />
        </View>
    )
}