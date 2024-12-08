import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AntDesign from '@expo/vector-icons/AntDesign';
import { api } from '@/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

export default function Page() {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const { id } = useLocalSearchParams();

  const zodiacNames = {
    "aries": "koc",
    "taurus": "boga",
    "gemini": "ikizler",
    "cancer": "yengec",
    "leo": "aslan",
    "virgo": "basak",
    "libra": "terazi",
    "scorpio": "akrep",
    "sagittarius": "yay",
    "capricorn": "oglak",
    "aquarius": "kova",
    "pisces": "balik"
  };
  const zodiac_time_periods = {
    "aries": "21 Mart - 19 Nisan",
    "taurus": "20 Nisan - 20 Mayıs",
    "gemini": "21 Mayıs - 20 Haziran",
    "cancer": "21 Haziran - 22 Temmuz",
    "leo": "23 Temmuz - 22 Ağustos",
    "virgo": "23 Ağustos - 22 Eylül",
    "libra": "23 Eylül - 22 Ekim",
    "scorpio": "23 Ekim - 21 Kasım",
    "sagittarius": "22 Kasım - 21 Aralık",
    "capricorn": "22 Aralık - 19 Ocak",
    "aquarius": "20 Ocak - 18 Şubat",
    "pisces": "19 Şubat - 20 Mart"
  };

  const translatedZodiacName = zodiacNames[id as keyof typeof zodiacNames] || id;
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)
  useEffect(() => {
    setLoading(true)
    api.post(`astrology/horoscope`, { horoscope: id, lng: currentLanguage }).then(res => {
      setData(res.data.data)
      setLoading(false)
      setError(null)

      console.log(res.data.data)
    }).catch(err => {
      setLoading(false)
      setError("Hata oldu. Lütfen daha sonra tekrar deneyiniz.")
      //console.log(err)
    })
  }, [id])
  return (
    <View className="flex-1 bg-[#A82A00] items-center relative  pb-5">
      <Image source={require("@/assets/images/dec-2.png")} className="object-cover absolute z-[1]" />
      <Image source={require("@/assets/images/dec-1.png")} className="object-cover absolute z-[2]" />
      <Image source={require("@/assets/images/stars.png")} className="object-center absolute z-[3]" />
      <SafeAreaView className="abolsute z-10 flex-1 w-full px-5">
        <View className="relative w-full mb-6">
          <Text className="text-white text-2xl font-bold mb-8 font-abold text-center capitalize">{t(`zodiac_signs.${id}.title`)}</Text>
          <TouchableOpacity onPress={() => { router.back() }} className="absolute left-1 top-1 ">
            <AntDesign name="left" size={28} color="white" />
          </TouchableOpacity>

        </View>
        <View className="flex-row items-center">
          {/* buraya burçun resimi gelecek */}
          {/* <Image /> */}
          <View className="flex-col items-start ml-1">
            <Text className="text-white text-xl font-aregular  capitalize ">
              {t(`zodiac_signs.${id}.title`)} Burcu
            </Text>
            <Text className="text-[#FFAA46] text-sm font-aregular">
              {t(`zodiac_signs.${id}.date`)}
            </Text>
          </View>
        </View>
        <View className="h-[1px]  mt-2 w-full bg-white" />
        <View className="mt-2">
          <View className="flex-col  gap-y-4 ">
            <Text className="text-white text-lg font-abold">
              <Text className="text-[#FFAA46] text-lg font-aregular">-{t('home.element')}</Text>{": "}{data?.element}
            </Text>
            <Text className="text-white text-lg font-abold">
              <Text className="text-[#FFAA46] text-lg font-aregular">-{t('home.planet')}</Text>{": "}{data?.planet}
            </Text>
            <Text className="text-white text-lg font-abold">
              <Text className="text-[#FFAA46] text-lg font-aregular">-{t('home.talent')}</Text>{": "}{data?.talent}
            </Text>
            <Text className="text-white text-lg font-abold">
              <Text className="text-[#FFAA46] text-lg font-aregular">-{t('home.goals')}</Text>{": "}{data?.goal}
            </Text>
            <Text className="text-white text-lg font-abold">
              <Text className="text-[#FFAA46] text-lg font-aregular">-{t('home.lucky_day')}</Text>{": "}{data?.lucky_day}
            </Text>
            <Text className="text-white text-lg font-abold">
              <Text className="text-[#FFAA46] text-lg font-aregular">-{t('home.lucky_numbers')}</Text>{": "}{data?.lucky_numbers}
            </Text>
            <Text className="text-white text-lg font-abold">
              <Text className="text-[#FFAA46] text-lg font-aregular">-{t('home.favorite_flowers')}</Text>{": "}{data?.favorite_flowers}
            </Text>
            <Text className="text-white text-lg font-abold">
              <Text className="text-[#FFAA46] text-lg font-aregular">-{t('home.health_risks')}</Text>{": "}{data?.health_risks}
            </Text>
            <Text className="text-white text-lg font-abold">
              <Text className="text-[#FFAA46] text-lg font-aregular">-{t('home.compatible_signs')}</Text>{": "}{data?.compatible_signs}
            </Text>

          </View>
        </View>

      </SafeAreaView>
      <StatusBar style="light" />
    </View>
  )
}
