import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated';

// Tarot JSON verisini içe aktarıyoruz
import { tarotDeck } from "@/data/tarot_deck";




type TarotCard = {
    id: number;
    name: string;
    image: string;
    description: string; // Bu satırı ekleyin
    meaning: { upright: string; reversed: string; }; // Bu satırı ekleyin
};

export default function Tarot() {
    const [selectedCards, setSelectedCards] = useState<number[]>([]);
    const [showButton, setShowButton] = useState(false);
    // const [isFlipped, setIsFlipped] = useState(false);
    const [revealedCards, setRevealedCards] = useState<any>([null, null, null]);

    const fadeAnim = useSharedValue(0);

    // Kart seçme işlemi
    const handleCardSelect = (index: number) => {
        if (selectedCards.length < 3 && !selectedCards.includes(index)) {
            const newSelected = [...selectedCards, index];
            setSelectedCards(newSelected);

            // Seçilen kartları ilgili alana yerleştir
            const updatedRevealed: any = [...revealedCards];
            updatedRevealed[newSelected.length - 1] = tarotDeck[index];
            setRevealedCards(updatedRevealed);
            console.log(newSelected.length)
            if (newSelected.length === 3) {
                fadeAnim.value = withTiming(1, { duration: 500 });
                setShowButton(true);
                console.log("buton göster")
            }
        }
    };

    const handleRevealCards = () => {
        // setIsFlipped(true);
    };

    const buttonStyle = useAnimatedStyle(() => ({
        opacity: fadeAnim.value,
    }));



    const groupSizes = [3, 5, 6, 5, 3]; // Her satırdaki kart sayısını belirtiyoruz

    const groupCards = (cards: any[], sizes: number[]) => {
        const groups = [];
        let currentIndex = 0;
        for (const size of sizes) {
            groups.push(cards.slice(currentIndex, currentIndex + size));
            currentIndex += size;
        }
        return groups;
    };

    //
    const isFlipped = useSharedValue(false);
    const handlePress = () => {
        console.log("")
        isFlipped.value = !isFlipped.value;
    };


    return (
        <View className="flex-1 bg-[#A82A00] items-center relative pb-5">
            <Image source={require("@/assets/images/dec-2.png")} className="object-cover absolute z-[1]" />
            <Image source={require("@/assets/images/dec-1.png")} className="object-cover absolute z-[2]" />
            <Image source={require("@/assets/images/stars.png")} className="object-center absolute z-[3]" />
            <SafeAreaView className="relative z-10 flex-1 w-full px-5">
                <Text className="text-white text-3xl font-bold mb-8 font-abold text-center">Daily Tarot</Text>

                {/* Üstteki boş tarot yerleri */}
                <View className="flex-row space-x-4 mb-4 justify-between">
                    {['Career', 'Love', 'Overall'].map((label, idx) => (
                        <View key={idx} className="items-center">
                            <View className="w-24 h-36 bg-black rounded-2xl items-center justify-center">
                                {revealedCards[idx] ? (
                                    <FlipCard
                                        isFlipped={isFlipped}
                                        image={revealedCards[idx].image}
                                    />
                                ) : (
                                    <Text className="text-white">?</Text>
                                )}
                            </View>
                            <Text className="text-white mt-2">{label}</Text>
                        </View>
                    ))}
                </View>

                {/* Kart Seçim Alanı */}
                {/* <View className="mb-8">
                    <View className="flex-row justify-center mb-4">
                        {tarotDeck.slice(0, 3).map((card: any, index: number) => (
                            <TouchableOpacity
                                key={card.id}
                                onPress={() => handleCardSelect(index)}
                                // disabled={selectedCards.includes(index) || isFlipped}
                                className={`w-14 h-20 m-2 ${selectedCards.includes(index) ? 'opacity-50' : ''}`}
                            >
                                <Image
                                    source={require("@/assets/images/tarots-cards/tarot_backend.png")}
                                    className="w-full h-full rounded-lg"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View className="flex-row justify-center mb-4">
                        {tarotDeck.slice(3, 8).map((card: any, index: number) => (
                            <TouchableOpacity
                                key={card.id}
                                onPress={() => handleCardSelect(index + 3)} // index + 3 to adjust for the slice
                                // disabled={selectedCards.includes(index + 3) || isFlipped}
                                className={`w-14 h-20 m-2 ${selectedCards.includes(index + 3) ? 'opacity-50' : ''}`}
                            >
                                <Image
                                    source={require("@/assets/images/tarots-cards/tarot_backend.png")}
                                    className="w-full h-full rounded-lg"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View className="flex-row justify-center mb-4">
                        {tarotDeck.slice(8, 14).map((card: any, index: number) => (
                            <TouchableOpacity
                                key={card.id}
                                onPress={() => handleCardSelect(index + 8)} // index + 8 to adjust for the slice
                                // disabled={selectedCards.includes(index + 8) || isFlipped}
                                className={`w-14 h-20 m-2 ${selectedCards.includes(index + 8) ? 'opacity-50' : ''}`}
                            >
                                <Image
                                    source={require("@/assets/images/tarots-cards/tarot_backend.png")}
                                    className="w-full h-full rounded-lg"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View className="flex-row justify-center mb-4">
                        {tarotDeck.slice(14, 19).map((card: any, index: number) => (
                            <TouchableOpacity
                                key={card.id}
                                onPress={() => handleCardSelect(index + 14)} // index + 8 to adjust for the slice
                                // disabled={selectedCards.includes(index + 8) || isFlipped}
                                className={`w-14 h-20 m-2 ${selectedCards.includes(index + 8) ? 'opacity-50' : ''}`}
                            >
                                <Image
                                    source={require("@/assets/images/tarots-cards/tarot_backend.png")}
                                    className="w-full h-full rounded-lg"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View className="flex-row justify-center">
                        {tarotDeck.slice(19, 22).map((card: any, index: number) => (
                            <TouchableOpacity
                                key={card.id}
                                onPress={() => handleCardSelect(index + 19)} // index + 8 to adjust for the slice
                                // disabled={selectedCards.includes(index + 8) || isFlipped}
                                className={`w-14 h-20 m-2 ${selectedCards.includes(index + 8) ? 'opacity-50' : ''}`}
                            >
                                <Image
                                    source={require("@/assets/images/tarots-cards/tarot_backend.png")}
                                    className="w-full h-full rounded-lg"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View> */}
                <View className="mb-8">
                    {groupCards(tarotDeck, groupSizes).map((group, rowIndex) => (
                        <View key={rowIndex} className="flex-row justify-center mb-4">
                            {group.map((card: any, index: number) => {
                                const adjustedIndex = groupSizes.slice(0, rowIndex).reduce((acc, val) => acc + val, 0) + index; // Grupların toplamı üzerinden index hesaplama
                                return (
                                    <TouchableOpacity
                                        key={card.id}
                                        onPress={() => handleCardSelect(adjustedIndex)}
                                        disabled={selectedCards.includes(adjustedIndex) || isFlipped.value}
                                        className={`w-14 h-20 m-2 ${selectedCards.includes(adjustedIndex) ? 'opacity-50' : ''}`}
                                    >
                                        <Image
                                            source={require("@/assets/images/tarots-cards/tarot_backend.png")}
                                            className="w-full h-full rounded-lg"
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    ))}
                </View>

                {/* Kartları Aç Butonu */}
                {showButton && (isFlipped.value ? null :
                    <Animated.View style={buttonStyle} className="absolute bottom-20 left-0 right-0  justify-center items-center ">
                        <TouchableOpacity
                            onPress={handlePress}
                            className="bg-[#DAA520] rounded-full px-6 py-3"
                        >
                            <Text className="text-white text-xl">Open Tarot Cards</Text>
                        </TouchableOpacity>
                    </Animated.View>

                )}
                {/* Kart Açıklamaları ve Get Reading Butonu */}
                {isFlipped.value && (
                    <View className="absolute bottom-20 left-0 right-0  justify-center items-center ">
                        <TouchableOpacity onPress={()=>{console.log(revealedCards)}} className="bg-[#DAA520] mt-8 rounded-full px-6 py-3">
                            <Text className="text-white text-xl">Get Reading</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
            <StatusBar style="light" />
        </View>
    );
}






const FlipCard = ({
    isFlipped,
    cardStyle,
    direction = 'y',
    duration = 500,
    image
}: {
    isFlipped: any;
    cardStyle?: object;
    direction?: 'x' | 'y';
    duration?: number;
    image: any
}) => {
    const isDirectionX = direction === 'x';

    const regularCardAnimatedStyle = useAnimatedStyle(() => {
        const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
        const rotateValue = withTiming(`${spinValue}deg`, { duration });

        return {
            transform: [
                isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
            ],
        };
    });

    const flippedCardAnimatedStyle = useAnimatedStyle(() => {
        const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
        const rotateValue = withTiming(`${spinValue}deg`, { duration });

        return {
            transform: [
                isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
            ],
        };
    });

    return (
        <View>
            <Animated.View
                style={[
                    flipCardStyles.regularCard,
                    cardStyle,
                    regularCardAnimatedStyle,
                ]}>

                <Image
                    source={require("@/assets/images/tarots-cards/tarot_backend.png")}
                    className="w-24 h-36 rounded-lg items-center justify-center "
                />
            </Animated.View>

            <Animated.View
                style={[
                    flipCardStyles.flippedCard,
                    cardStyle,
                    flippedCardAnimatedStyle,
                ]}>

                <Image
                    source={image}
                    className="w-24 h-36 rounded-lg  items-center justify-center object-center object-cover  "
                />
            </Animated.View>
        </View>
    );
};

const flipCardStyles = StyleSheet.create({
    regularCard: {
        position: 'absolute',
        zIndex: 1,
    },
    flippedCard: {
        backfaceVisibility: 'hidden',
        zIndex: 2,
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    toggleButton: {
        backgroundColor: '#b58df1',
        padding: 12,
        borderRadius: 48,
    },
    toggleButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    // flipCard: {
    //     width: 170,
    //     height: 200,
    // },
});