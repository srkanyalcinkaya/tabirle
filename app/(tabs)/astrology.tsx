import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

const zodiacSigns = [
    { name: 'Aries', date: 'Mar 21 - Apr 19', image: require('@/assets/images/horoscope/horoscope-5.png'), value: 'aries' },
    { name: 'Taurus', date: 'Apr 20 - May 20', image: require('@/assets/images/horoscope/horoscope-1.png'), value: 'taurus' },
    { name: 'Gemini', date: 'May 21 - Jun 20', image: require('@/assets/images/horoscope/horoscope-2.png'), value: 'gemini' },
    { name: 'Cancer', date: 'Jun 21 - Jul 22', image: require('@/assets/images/horoscope/horoscope-12.png'), value: 'cancer' },
    { name: 'Leo', date: 'Jul 23 - Aug 22', image: require('@/assets/images/horoscope/horoscope-9.png'), value: 'leo' },
    { name: 'Virgo', date: 'Aug 23 - Sep 22', image: require('@/assets/images/horoscope/horoscope-6.png'), value: 'virgo' },
    { name: 'Libra', date: 'Sep 23 - Oct 22', image: require('@/assets/images/horoscope/horoscope-11.png'), value: 'libra' },
    { name: 'Scorpio', date: 'Oct 23 - Nov 21', image: require('@/assets/images/horoscope/horoscope-8.png'), value: 'scorpio' },
    { name: 'Sagittarius', date: 'Nov 22 - Dec 21', image: require('@/assets/images/horoscope/horoscope-4.png'), value: 'sagittarius' },
    { name: 'Capricorn', date: 'Dec 22 - Jan 19', image: require('@/assets/images/horoscope/horoscope-3.png'), value: 'capricorn' },
    { name: 'Aquarius', date: 'Jan 20 - Feb 18', image: require('@/assets/images/horoscope/horoscope-10.png'), value: 'aquarius' },
    { name: 'Pisces', date: 'Feb 19 - Mar 20', image: require('@/assets/images/horoscope/horoscope-7.png'), value: 'pisces' },
];

const ListItem = ({ item }: { item: any }) => {
    const { t } = useTranslation();
    return (
        <TouchableOpacity onPress={() => router.push(`/astrology/${item.value}`)}
            className="h-32 w-44  items-center justify-center rounded-xl bg-[#FFAA46]/80">
            <Image
                source={item.image}
                className="w-12 h-12 rounded-full "
            />
            <Text className="text-white font-aregular mt-1 text-base">
                {t(`zodiac_signs.${item.value}.title`)}</Text>
            <Text className="text-gray-200 font-aregular mt-1 text-sm "> {t(`zodiac_signs.${item.value}.date`)}</Text>
        </TouchableOpacity>
    )
}


export default function Astrology() {
    const { t } = useTranslation();
    return (
        <View className="flex-1 bg-[#A82A00] items-center relative  pb-5">
            <Image source={require("@/assets/images/dec-2.png")} className="object-cover absolute z-[1]" />
            <Image source={require("@/assets/images/dec-1.png")} className="object-cover absolute z-[2]" />
            <Image source={require("@/assets/images/stars.png")} className="object-center absolute z-[3]" />
            <SafeAreaView className="abolsute z-10 flex-1 w-full px-5">
                <Text className="text-white text-2xl font-abold my-5 text-center">{t("astrology")}</Text>
                <ScrollView contentContainerClassName='flex-row flex-wrap items-center justify-center gap-2 pb-14' showsVerticalScrollIndicator={false}>
                    {zodiacSigns.map(item => (
                        <ListItem key={item.value} item={item} />
                    ))}
                </ScrollView>
            </SafeAreaView>
            <StatusBar style="light" />
        </View>
    )
}