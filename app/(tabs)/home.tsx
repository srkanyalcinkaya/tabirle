import { StatusBar } from "expo-status-bar";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from "expo-router";
import { useAccount } from "@/redux/reducers/app/hooks";
import { useTranslation } from "react-i18next";


export default function Home() {
    const { t, i18n } = useTranslation();
    const { name, date_of_birth, relationship_status, zodiacSign, zodiac_features } = useAccount();
    
    const signData = zodiac_features[i18n.language]
    const date = new Date();
    const months = [
        t('months.january'), t('months.february'), t('months.march'), t('months.april'), t('months.may'), t('months.june'),
        t('months.july'), t('months.august'), t('months.september'), t('months.october'), t('months.november'), t('months.december')
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, '0'); // Saat iki haneli olsun
    const minute = String(date.getMinutes()).padStart(2, '0'); // Dakika iki haneli olsun

    const formattedDate = `${month} ${day}, ${year} - ${hour}:${minute}`;


    return (
        <View className="flex-1 bg-[#A82A00] items-center relative">
            <Image source={require("@/assets/images/dec-2.png")} className="object-cover absolute z-[1]" />
            <Image source={require("@/assets/images/dec-1.png")} className="object-cover absolute z-[2]" />
            <Image source={require("@/assets/images/stars.png")} className="object-center absolute z-[3]" />
            <SafeAreaView className="abolsute z-10 flex-1 w-full px-5">
                <View className="flex-row justify-between items-center w-full ">
                    <View className="mt-5 flex-col items-start">
                        <Text className="text-white font-aregular text-3xl">{t('home.hello')}, {name}</Text>
                        <Text className="font-aregular text-base text-[#C8C8C8] ">{formattedDate}</Text>
                    </View>
                    <TouchableOpacity onPress={() => { router.push("/(settings)") }}>
                        <Ionicons name="settings-sharp" size={28} color="white" />
                    </TouchableOpacity>
                </View>
                <View className="flex-col items-center justify-center mt-10">
                    <View className="mb-6">
                        <Text className="text-xl font-aregular text-center text-white">{name}</Text>
                        <Text className="text-base font-aregular text-[#C8C8C8] ">{t(`zodiac_signs.${zodiacSign}.title`)} - {t(`relationship_status.${relationship_status}`)}</Text>
                    </View>
                    <View className="flex-row items-center justify-center gap-x-5 w-full">
                        <View className="flex-col items-start gap-y-4">
                            <View>
                                <Text className=" text-[#C8C8C8]  font-aregular">
                                    {t('home.ruling_planet')}
                                </Text>
                                <Text className="text-white font-abold">
                                    {signData.planet}
                                </Text>
                            </View>
                            <View>
                                <Text className=" text-[#C8C8C8]  font-aregular">
                                    {t('home.lucky_number')}
                                </Text>
                                <Text className="text-white font-abold">
                                    {signData.lucky_numbers}
                                </Text>
                            </View>
                            <View>
                                <Text className=" text-[#C8C8C8]  font-aregular">
                                    {t('home.opposite_sign')}
                                </Text>
                                <Text className="text-white font-abold">
                                    {signData.opposite_sign}
                                </Text>
                            </View>
                        </View>
                        <View className="w-40 h-40 items-center justify-center">
                            <Image className="w-full h-full" source={require("@/assets/images/horoscope/horoscope-1.png")} />
                        </View>
                        <View className="flex-col items-end justify-end gap-y-4">
                            <View className="items-end">
                                <Text className=" text-[#C8C8C8]  font-aregular">
                                    {t('home.element')}
                                </Text>
                                <Text className="text-white font-abold">
                                {signData.element}
                                </Text>
                            </View>
                            <View className="items-end">
                                <Text className=" text-[#C8C8C8]  font-aregular">
                                    {t('home.lucky_day')}
                                </Text>
                                <Text className="text-white font-abold">
                                {signData.lucky_day}
                                </Text>
                            </View>
                            <View className="items-end">
                                <Text className=" text-[#C8C8C8]  font-aregular">
                                    {t('home.lucky_stone')}
                                </Text>
                                <Text className="text-white font-abold">
                                    {signData.lucky_stone}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => { router.push(`/astrology/${zodiacSign}`) }} className={`bg-[#DAA520] p-4 rounded-2xl w-full mt-10`}>
                        <Text className="text-[#8C2F00] text-xl font-aregular text-center">{t('home.more_details')}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <StatusBar style="light" />
        </View>
    )
}