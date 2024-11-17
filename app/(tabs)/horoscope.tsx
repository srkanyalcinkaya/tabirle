import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, SharedValue } from 'react-native-reanimated';
import { PanGestureHandler, GestureHandlerGestureEvent } from 'react-native-gesture-handler';
import AntDesign from '@expo/vector-icons/AntDesign';
import CompatibilityIcon from '@/components/icons';
import { StatusBar } from 'expo-status-bar';

const zodiacSigns = [
  { name: 'Aries', date: 'Mar 21 - Apr 19', image: require('@/assets/images/horoscope/horoscope-5.png') },
  { name: 'Taurus', date: 'Apr 20 - May 20', image: require('@/assets/images/horoscope/horoscope-1.png') },
  { name: 'Gemini', date: 'May 21 - Jun 20', image: require('@/assets/images/horoscope/horoscope-2.png') },
  { name: 'Cancer', date: 'Jun 21 - Jul 22', image: require('@/assets/images/horoscope/horoscope-12.png') },
  { name: 'Leo', date: 'Jul 23 - Aug 22', image: require('@/assets/images/horoscope/horoscope-9.png') },
  { name: 'Virgo', date: 'Aug 23 - Sep 22', image: require('@/assets/images/horoscope/horoscope-6.png') },
  { name: 'Libra', date: 'Sep 23 - Oct 22', image: require('@/assets/images/horoscope/horoscope-11.png') },
  { name: 'Scorpio', date: 'Oct 23 - Nov 21', image: require('@/assets/images/horoscope/horoscope-8.png') },
  { name: 'Sagittarius', date: 'Nov 22 - Dec 21', image: require('@/assets/images/horoscope/horoscope-4.png') },
  { name: 'Capricorn', date: 'Dec 22 - Jan 19', image: require('@/assets/images/horoscope/horoscope-3.png') },
  { name: 'Aquarius', date: 'Jan 20 - Feb 18', image: require('@/assets/images/horoscope/horoscope-10.png') },
  { name: 'Pisces', date: 'Feb 19 - Mar 20', image: require('@/assets/images/horoscope/horoscope-7.png') },
];

const compatibilityMap: Record<string, Record<string, string>> = {
  Aries: { Leo: 'High', Sagittarius: 'High', Gemini: 'Medium', Pisces: 'Low' },
  Taurus: { Virgo: 'High', Capricorn: 'High', Gemini: 'Medium', Aries: 'Low' },
  Gemini: { Libra: 'High', Aquarius: 'High', Cancer: 'Medium', Taurus: 'Low' },
  Cancer: { Scorpio: 'High', Pisces: 'High', Aries: 'Medium', Sagittarius: 'Low' },
  Leo: { Aries: 'High', Sagittarius: 'High', Virgo: 'Medium', Capricorn: 'Low' },
  Virgo: { Taurus: 'High', Capricorn: 'High', Libra: 'Medium', Leo: 'Low' },
  Libra: { Gemini: 'High', Aquarius: 'High', Scorpio: 'Medium', Virgo: 'Low' },
  Scorpio: { Cancer: 'High', Pisces: 'High', Libra: 'Medium', Gemini: 'Low' },
  Sagittarius: { Aries: 'High', Leo: 'High', Capricorn: 'Medium', Cancer: 'Low' },
  Capricorn: { Taurus: 'High', Virgo: 'High', Aquarius: 'Medium', Sagittarius: 'Low' },
  Aquarius: { Gemini: 'High', Libra: 'High', Pisces: 'Medium', Capricorn: 'Low' },
  Pisces: { Cancer: 'High', Scorpio: 'High', Aquarius: 'Medium', Aries: 'Low' },
};


export default function Index() {

  const [selectedSign1, setSelectedSign1] = useState<number>(0);
  const [selectedSign2, setSelectedSign2] = useState<number>(6);
  const [compatibilityReuslt, setCompatibilityReuslt] = useState<string | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const translateX: SharedValue<number> = useSharedValue(0);
  //* burada handleGesture ve handleGesture2 fonskiyonları düzeltilmeli çok hızlı gidiyor
  const handleGesture = (event: GestureHandlerGestureEvent) => {
    const translationX = event.nativeEvent.translationX as number;
    if (translationX < -50) {
      setSelectedSign1((prev) => (prev + 1) % zodiacSigns.length);
    } else if (translationX > 50) {
      setSelectedSign1((prev) => (prev - 1 + zodiacSigns.length) % zodiacSigns.length);
    }

    translateX.value = withSpring(0); // Reset the position after the gesture
  };

  const handleGesture2 = (event: GestureHandlerGestureEvent) => {
    const translationX = event.nativeEvent.translationX as number;
    if (translationX < -50) {
      setSelectedSign2((prev) => (prev + 1) % zodiacSigns.length);
    } else if (translationX > 50) {
      setSelectedSign2((prev) => (prev - 1 + zodiacSigns.length) % zodiacSigns.length);
    }

    translateX.value = withSpring(0); // Reset the position after the gesture
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const getZodiacIndex = (offset: number): number => {
    return (selectedSign1 + offset + zodiacSigns.length) % zodiacSigns.length;
  };
  const getZodiacIndex2 = (offset: number): number => {
    return (selectedSign2 + offset + zodiacSigns.length) % zodiacSigns.length;
  };


  const checkCompatibility = (sign1: string, sign2: string): string => {
    const compatibilityLevel = compatibilityMap[sign1]?.[sign2] || compatibilityMap[sign2]?.[sign1];
    if (compatibilityLevel === 'High') {
      return 'Compatible 💖';
    } else if (compatibilityLevel === 'Medium') {
      return 'Moderately Compatible 💛';
    } else {
      return 'Incompatible 💔';
    }
  };

  const handleCheckCompatibility = () => {
    const result = checkCompatibility(zodiacSigns[selectedSign1].name, zodiacSigns[selectedSign2].name);
    console.log(`Result: ${result}`);
    setCompatibilityReuslt(result)
    setShow(true)
  };

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);  // 30 saniye sonra show'u false yap
        setCompatibilityReuslt(null) // durumu null'a çekiyorum
      }, 30000);  // 30 saniye = 30000 milisaniye

      // Cleanup: Eğer component unmount edilirse veya `show` değişirse, timer'ı temizle
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <View className="flex-1 bg-[#A82A00] items-center relative  pb-5">
      <Image source={require("@/assets/images/dec-2.png")} className="object-cover absolute z-[1]" />
      <Image source={require("@/assets/images/dec-1.png")} className="object-cover absolute z-[2]" />
      <Image source={require("@/assets/images/stars.png")} className="object-center absolute z-[3]" />
      <SafeAreaView className="abolsute z-10 flex-1 w-full px-5">

        <Text className="text-white text-2xl font-abold text-center mb-5">Compatibility</Text>
        <View className='flex-col items-center justify-center'>
          {/* Seçili Burcun Bilgileri */}
          <View className='flex-row items-center w-[260px] justify-between mb-11 h-14'>
            <TouchableOpacity onPress={() => { setSelectedSign1((prev) => (prev - 1 + zodiacSigns.length) % zodiacSigns.length) }} >
              <AntDesign name="left" size={24} color="white" />
            </TouchableOpacity>
            <View className='flex-col items-center '>
              <Text className="text-white text-2xl font-abold">
                {zodiacSigns[selectedSign1].name}
              </Text>
              <Text className="text-[#C8C8C8] font-aregular ">{zodiacSigns[selectedSign1].date}</Text>

            </View>
            <TouchableOpacity onPress={() => { setSelectedSign1((prev) => (prev + 1) % zodiacSigns.length) }}>
              <AntDesign name="right" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <PanGestureHandler onGestureEvent={handleGesture}>
            <Animated.View style={animatedStyle} className="flex-row items-center">
              <View className="flex-row items-center justify-center relative w-full">
                {/* Sol Burç */}
                <Image
                  source={zodiacSigns[getZodiacIndex(-1)].image}
                  className="w-20 h-20 rounded-full opacity-50 absolute top-0 left-7"
                />

                {/* Seçili Burç */}
                <Image
                  source={zodiacSigns[selectedSign1].image}
                  className="w-32 h-32 rounded-full mx-5"
                />

                {/* Sağ Burç */}
                  <Image
                    source={zodiacSigns[getZodiacIndex(1)].image}
                    className="w-20 h-20 rounded-full opacity-50 absolute top-0 right-7 "
                  />
              </View>
            </Animated.View>
          </PanGestureHandler>


        </View>
        <View className='my-10 h-[50px] items-center justify-center '>
          {/* <Image className="w-20 h-20" source={require("@/assets/images/compatibility.svg")} /> */}
          {show ?
            <Text className='text-white font-abold text-4xl'>
              {compatibilityReuslt}
            </Text> :
            <CompatibilityIcon />
          }
        </View>
        <View className='flex-col items-center justify-center'>
          <PanGestureHandler onGestureEvent={handleGesture2}>
            <Animated.View style={animatedStyle} className="flex-row items-center">
              <View className="flex-row items-center justify-center relative w-full ">
                {/* Sol Burç */}
                <Image
                  source={zodiacSigns[getZodiacIndex2(-1)].image}
                  className="w-16 h-16 rounded-full opacity-50 absolute bottom-0 left-7"
                />

                {/* Seçili Burç */}
                <Image
                  source={zodiacSigns[selectedSign2].image}
                  className="w-32 h-32 rounded-full mx-5"
                />

                {/* Sağ Burç */}
                <Image
                  source={zodiacSigns[getZodiacIndex2(1)].image}
                  className="w-16 h-16 rounded-full opacity-50 absolute bottom-0 right-7"
                />
              </View>
            </Animated.View>
          </PanGestureHandler>

          <View className='flex-row items-center w-[260px] justify-between my-11 h-14'>
            <TouchableOpacity onPress={() => { setSelectedSign2((prev) => (prev - 1 + zodiacSigns.length) % zodiacSigns.length) }} >
              <AntDesign name="left" size={24} color="white" />
            </TouchableOpacity>
            <View className='flex-col items-center '>
              <Text className="text-white text-2xl font-abold ">
                {zodiacSigns[selectedSign2].name}
              </Text>
              <Text className="text-[#C8C8C8] font-aregular ">{zodiacSigns[selectedSign2].date}</Text>

            </View>
            <TouchableOpacity onPress={() => { setSelectedSign2((prev) => (prev + 1) % zodiacSigns.length) }}>
              <AntDesign name="right" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={handleCheckCompatibility} className={`bg-[#DAA520] p-4 rounded-2xl w-full mt-4`}>
          <Text className="text-[#8C2F00] text-xl font-aregular text-center  ">Check Compatibility</Text>
        </TouchableOpacity>
      </SafeAreaView >
      <StatusBar style="light" />
    </View >
  )
}