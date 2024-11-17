// import { View, Image, TouchableOpacity, Text } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// import Swiper from 'react-native-swiper';

// export default function Onboarding({ navigation }: { navigation: any }) {




//     return (
//         <View className="flex-1 bg-[#A82A00] items-center relative  pb-5">
//             <Image source={require("@/assets/images/dec-2.png")} className="object-cover absolute z-[1]" />
//             <Image source={require("@/assets/images/dec-1.png")} className="object-cover absolute z-[2]" />
//             <Image source={require("@/assets/images/stars.png")} className="object-center absolute z-[3]" />

//             <SafeAreaView className="abolsute z-10 flex-1 w-full px-5">
//                 <Swiper loop={false} showsPagination={true} dotColor="#ffffff60" activeDotColor="#FFFFFF">
//                     {/* Ekran 1 */}
//                     <View className="flex-1 items-center justify-center p-5">
//                         <Text className="text-3xl font-bold text-white text-center mb-4">
//                             Merhaba! Rüyalarının sırlarını keşfet.
//                         </Text>
//                         <Text className="text-lg text-white text-center">
//                             Rüyalarının anlamlarını çöz, yıldızlardan rehberlik al ve tarotun bilgeliğine ulaş.
//                         </Text>
//                     </View>

//                     {/* Ekran 2 */}
//                     <View className="flex-1 items-center justify-center p-5">
//                         <Text className="text-3xl font-bold text-white text-center mb-4">
//                             Rüya Tabiri, Günlük Burç ve Tarot Bakımı
//                         </Text>
//                         <Text className="text-lg text-white text-center">
//                             Rüyalarını yapay zekayla yorumla, günlük burç yorumlarını al ve tarot kartlarıyla içgörü kazan.
//                         </Text>
//                     </View>

//                     {/* Ekran 3 - Başlat */}
//                     <View className="flex-1 items-center justify-center p-5">
//                         <Text className="text-3xl font-bold text-white text-center mb-4">
//                             Haydi Başlayalım!
//                         </Text>
//                         <TouchableOpacity
//                             className="bg-white py-3 px-6 rounded-full mt-6"
//                             onPress={() => navigation.replace('Home')}
//                         >
//                             <Text className="text-[#A82A00] font-bold text-lg">Başla</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </Swiper>
//             </SafeAreaView>
//             <StatusBar backgroundColor="#161622" style="light" />
//         </View>
//     )
// }   


import { View, FlatList, ViewToken } from 'react-native';
import React from 'react';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedRef,
} from 'react-native-reanimated';
import data, { OnboardingData } from '@/data/data';
import Pagination from '@/components/Pagination';
import CustomButton from '@/components/CustomButton';
import RenderItem from '@/components/RenderItem';
import { StatusBar } from 'expo-status-bar';


export default function Onboarding() {


    const flatListRef = useAnimatedRef<FlatList<OnboardingData>>();
    const x = useSharedValue(0);
    const flatListIndex = useSharedValue(0);

    const onViewableItemsChanged = ({
        viewableItems,
    }: {
        viewableItems: ViewToken[];
    }) => {
        if (viewableItems[0].index !== null) {
            flatListIndex.value = viewableItems[0].index;
        }
    };

    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x;
        },
    });

    return (
        <View className="flex-1">
            <Animated.FlatList
                ref={flatListRef}
                onScroll={onScroll}
                data={data}
                renderItem={({ item, index }) => {
                    return <RenderItem item={item} index={index} x={x} />;
                }}
                keyExtractor={item => item.id.toString()}
                scrollEventThrottle={16}
                horizontal={true}
                bounces={false}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{
                    minimumViewTime: 300,
                    viewAreaCoveragePercentThreshold: 10,
                }}
            />
            <View className="flex-row justify-between items-center mx-[30px] py-[30px] absolute bottom-[20] left-0 right-0">
                <Pagination data={data} x={x} />
                <CustomButton
                    flatListRef={flatListRef}
                    flatListIndex={flatListIndex}
                    dataLength={data.length}
                    x={x}
                />
            </View>
            <StatusBar style="light" />
        </View>
    )
}
