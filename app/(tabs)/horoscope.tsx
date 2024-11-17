import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AriesImage from '@/assets/images/horoscope/horoscope-5.png';
import TaurusImage from '@/assets/images/horoscope/horoscope-1.png';
import GeminiImage from '@/assets/images/horoscope/horoscope-2.png';
import CancerImage from '@/assets/images/horoscope/horoscope-12.png';
import LeoImage from '@/assets/images/horoscope/horoscope-9.png';
import VirgoImage from '@/assets/images/horoscope/horoscope-6.png';
import LibraImage from '@/assets/images/horoscope/horoscope-11.png';
import ScorpioImage from '@/assets/images/horoscope/horoscope-8.png';
import SagittariusImage from '@/assets/images/horoscope/horoscope-4.png';
import CapricornImage from '@/assets/images/horoscope/horoscope-3.png';
import AquariusImage from '@/assets/images/horoscope/horoscope-10.png';
import PiscesImage from '@/assets/images/horoscope/horoscope-7.png';


const zodiacSigns = [
  { name: "Aries", date: "Mar 21 - Apr 19", image: "@/assets/images/horoscope/horoscope-5.png" },
  { name: "Taurus", date: "Apr 20 - May 20", image: "@/assets/images/horoscope/horoscope-1.png" },
  { name: "Gemini", date: "May 21 - Jun 20", image: "@/assets/images/horoscope/horoscope-2.png" },
  { name: "Cancer", date: "Jun 21 - Jul 22", image: "@/assets/images/horoscope/horoscope-12.png" },
  { name: "Leo", date: "Jul 23 - Aug 22", image: "@/assets/images/horoscope/horoscope-9.png" },
  { name: "Virgo", date: "Aug 23 - Sep 22", image: "@/assets/images/horoscope/horoscope-6.png" },
  { name: "Libra", date: "Sep 23 - Oct 22", image: "@/assets/images/horoscope/horoscope-11.png" },
  { name: "Scorpio", date: "Oct 23 - Nov 21", image: "@/assets/images/horoscope/horoscope-8.png" },
  { name: "Sagittarius", date: "Nov 22 - Dec 21", image: "@/assets/images/horoscope/horoscope-4.png" },
  { name: "Capricorn", date: "Dec 22 - Jan 19", image: "@/assets/images/horoscope/horoscope-3.png" },
  { name: "Aquarius", date: "Jan 20 - Feb 18", image: "@/assets/images/horoscope/horoscope-10.png" },
  { name: "Pisces", date: "Feb 19 - Mar 20", image: "@/assets/images/horoscope/horoscope-7.png" },
];

export default function Index() {
  const [selectedSign1, setSelectedSign1] = useState<number>(0);
  const [selectedSign2, setSelectedSign2] = useState<number>(6);


  return (
    <View className="flex-1 bg-[#A82A00] items-center relative  pb-5">
      <Image source={require("@/assets/images/dec-2.png")} className="object-cover absolute z-[1]" />
      <Image source={require("@/assets/images/dec-1.png")} className="object-cover absolute z-[2]" />
      <Image source={require("@/assets/images/stars.png")} className="object-center absolute z-[3]" />
      <SafeAreaView className="abolsute z-10 flex-1 w-full px-5">
        <Text>
          Homess
        </Text>

        <View className="items-center mb-10">
          <Text className="text-white text-lg font-bold mb-4">Compatibility</Text>
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => setSelectedSign1((prev) => (prev - 1 + zodiacSigns.length) % zodiacSigns.length)}>
              {/* <ChevronLeftIcon size={24} color="#fff" /> */}
              <Text>Left</Text>
            </TouchableOpacity>
            <View className="mx-4 items-center">
              <Image source={require(`${zodiacSigns[selectedSign1].image}`)} className="w-24 h-24 rounded-full" />
              <Text className="text-white font-bold mt-4">{zodiacSigns[selectedSign1].name}</Text>
              <Text className="text-gray-400">{zodiacSigns[selectedSign1].date}</Text>
            </View>
            <TouchableOpacity onPress={() => setSelectedSign1((prev) => (prev + 1) % zodiacSigns.length)}>
              {/* <ChevronRightIcon size={24} color="#fff" /> */}
              <Text>Rigth</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Kalp İkonu */}
        <View className="mb-10">
          <Text className="text-pink-400 text-2xl">❤️</Text>
        </View>

        {/* Burç 2 */}
        <View className="items-center mb-10">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => setSelectedSign2((prev) => (prev - 1 + zodiacSigns.length) % zodiacSigns.length)}>
              {/* <ChevronLeftIcon size={24} color="#fff" /> */}
              <Text>Left</Text>
            </TouchableOpacity>
            <View className="mx-4 items-center">
              <Image source={require(`${zodiacSigns[selectedSign2].image}`)} className="w-24 h-24 rounded-full" />
              <Text className="text-white font-bold mt-4">{zodiacSigns[selectedSign2].name}</Text>
              <Text className="text-gray-400">{zodiacSigns[selectedSign2].date}</Text>
            </View>
            <TouchableOpacity onPress={() => setSelectedSign2((prev) => (prev + 1) % zodiacSigns.length)}>
              {/* <ChevronRightIcon size={24} color="#fff" /> */}
              <Text>Right</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Uyumluluğu Kontrol Et Butonu */}
        <TouchableOpacity className="bg-blue-600 py-3 px-6 rounded-full mt-10">
          <Text className="text-white font-bold">Check Compatibility</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}