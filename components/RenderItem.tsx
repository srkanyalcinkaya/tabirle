import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import Animated, {
    Extrapolation,
    SharedValue,
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { OnboardingData } from '@/data/data';

type Props = {
    index: number;
    x: SharedValue<number>;
    item: OnboardingData;
};

const RenderItem = ({ index, x, item }: Props) => {
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

    const lottieAnimationStyle = useAnimatedStyle(() => {
        const translateYAnimation = interpolate(
            x.value,
            [
                (index - 1) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH,
            ],
            [200, 0, -200],
            Extrapolation.CLAMP,
        );

        return {
            transform: [{ translateY: translateYAnimation }],
        };
    });

    const circleAnimation = useAnimatedStyle(() => {
        const scale = interpolate(
            x.value,
            [
                (index - 1) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH,
            ],
            [1, 4, 4],
            Extrapolation.CLAMP,
        );

        return {
            transform: [{ scale: scale }],
        };
    });

    return (
        <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
            <View style={styles.circleContainer}>
                <Animated.View
                    style={[
                        {
                            width: SCREEN_WIDTH,
                            height: SCREEN_WIDTH,
                            borderRadius: SCREEN_WIDTH / 2,
                            backgroundColor: item.backgroundColor,
                        },
                        circleAnimation,
                    ]}
                >
                    <Image source={require("@/assets/images/dec-2.png")}  className="w-full h-full absolute z-[9999]" />
                    {/* <Image source={require("@/assets/images/dec-1.png")}  classNˆame="w-full h-full absolute z-[9999]" /> */}
                    <Image source={require("@/assets/images/stars.png")}  className="w-full h-full absolute z-[9999]" />

                </Animated.View>
            </View>
            <Animated.View style={lottieAnimationStyle}>
                <LottieView
                    source={item.animation}
                    style={{
                        width: SCREEN_WIDTH * 0.9,
                        height: SCREEN_WIDTH * 0.9,
                    }}
                    autoPlay
                    loop
                />
            </Animated.View>
            <View className='flex-col items-center gap-y-4'>
                <Text style={[styles.itemText, { color: item.textColor }]}
                    className='font-abold '>
                    {item.text}
                </Text>
                <Text style={[{ color: item.textColor }]}
                    className='text-lg px-6 text-center font-aregular   '
                >
                    {item.description}
                </Text>
            </View>
        </View>
    );
};

export default RenderItem;

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        marginBottom: 120,
        position: "relative"
    },
    itemText: {
        textAlign: 'center',
        fontSize: 32,
        marginHorizontal: 16,
        fontFamily: "ArefRuqaa-Bold",
    },
    circleContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});