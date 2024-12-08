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
import { useAccount } from '@/redux/reducers/app/hooks';
import { Redirect } from 'expo-router';


export default function Onboarding() {
    const { isLoading, isLogged, isCompletedWelcome } = useAccount();

    if (!isLoading && isLogged) {
        if (isCompletedWelcome) {
            return <Redirect href="/home" />
        } else {
            return <Redirect href="/welcome" />
        }
    };

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



//* 1- Responsivelik ekle boyutlar birbirine uymuyor
//* 2- burçların resimlerin adları değişip kodda temizlığe gidilecek