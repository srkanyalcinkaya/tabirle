import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {

    const date = new Date();
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, '0'); // Saat iki haneli olsun
    const minute = String(date.getMinutes()).padStart(2, '0'); // Dakika iki haneli olsun

    const formattedDate = `${month} ${day}, ${year} - ${hour}:${minute}`;


    return (
        <View className="flex-1 bg-[#A82A00] items-center relative  pb-5">
            <Image source={require("@/assets/images/dec-2.png")} className="object-cover absolute z-[1]" />
            <Image source={require("@/assets/images/dec-1.png")} className="object-cover absolute z-[2]" />
            <Image source={require("@/assets/images/stars.png")} className="object-center absolute z-[3]" />
            <SafeAreaView className="abolsute z-10 flex-1 w-full px-5">
                <View className="mt-5 flex-col items-start">
                    <Text className="text-white font-aregular text-3xl">Hello, Serkan</Text>
                    <Text className="font-aregular text-base text-[#C8C8C8] ">{formattedDate}</Text>
                </View>
                <View className="flex-col items-center justify-center mt-10">
                    <View className="mb-6">
                        <Text className="text-xl font-aregular text-white">Serkan Admin</Text>
                        <Text className="text-base font-aregular text-[#C8C8C8]">Scorpio - Married</Text>
                    </View>
                    <View className="flex-row items-center justify-center gap-x-5 w-full">
                        <View className="flex-col items-start gap-y-4">
                            <View>
                                <Text className=" text-[#C8C8C8]  font-aregular">
                                    Ruling Planet
                                </Text>
                                <Text className="text-white font-abold">
                                    Ruling Planet
                                </Text>
                            </View>
                            <View>
                                <Text className=" text-[#C8C8C8]  font-aregular">
                                    Lucky Number
                                </Text>
                                <Text className="text-white font-abold">
                                    9
                                </Text>
                            </View>
                            <View>
                                <Text className=" text-[#C8C8C8]  font-aregular">
                                    Opposite Sign
                                </Text>
                                <Text className="text-white font-abold">
                                    Libra
                                </Text>
                            </View>
                        </View>
                        <View className="w-40 h-40 items-center justify-center">
                            <Image className="w-full h-full" source={require("@/assets/images/horoscope/horoscope-1.png")} />
                        </View>
                        <View className="flex-col items-end justify-end gap-y-4">
                            <View className="items-end">
                                <Text className=" text-[#C8C8C8]  font-aregular">
                                    Element
                                </Text>
                                <Text className="text-white font-abold">
                                    Fire
                                </Text>
                            </View>
                            <View className="items-end">
                                <Text className=" text-[#C8C8C8]  font-aregular">
                                    Lucky Day
                                </Text>
                                <Text className="text-white font-abold">
                                    Tuesday
                                </Text>
                            </View>
                            <View className="items-end">
                                <Text className=" text-[#C8C8C8]  font-aregular">
                                    Metal
                                </Text>
                                <Text className="text-white font-abold">
                                    Iron
                                </Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={()=>{console.log("More Details Page")}} className={`bg-[#DAA520] p-4 rounded-2xl w-full mt-10 `}>
                        <Text className="text-[#8C2F00] text-xl font-aregular text-center  ">More Details</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}