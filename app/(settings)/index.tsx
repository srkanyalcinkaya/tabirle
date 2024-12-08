import { StatusBar } from "expo-status-bar";
import { Alert, FlatList, Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/reducers/app/appSlice";
import BottomSheet, { BottomSheetView, useBottomSheet } from '@gorhom/bottom-sheet';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const supportedURL = 'mailto:support@tabirle.com';



const flags = [
    { lang: "tr-TR", name: "Türkçe" },
    { lang: "en-US", name: "English" },
];


export default function Settings() {

    /**Bottom sheet  */

    // ref
    const langBottomSheetRef: any = useRef<BottomSheet>(null);
    const handleClosePress = () => langBottomSheetRef.current.close()
    const handleOpenPress = () => langBottomSheetRef.current.expand()



    const dispatch = useDispatch();
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(supportedURL);
        await Linking.openURL(supportedURL);
        
    }, [supportedURL]);




    const links = [
        {
            icon: <MaterialCommunityIcons name="theme-light-dark" size={28} color="white" />,
            label: "settings.dark-appearance",
            tag: false,
            tag_label: "",
            onPress: () => { }
        },
        {
            icon: <AntDesign name="star" size={28} color="white" />,
            label: "settings.subscriptions",
            tag: true,
            tag_label: "free_plan",
            onPress: () => { }
        },
        {
            icon: <Entypo name="language" size={28} color="white" />,
            label: "settings.change_language",
            tag: true,
            tag_label: "English",
            onPress: () => handleOpenPress()
        },
        {
            icon: <MaterialIcons name="rate-review" size={28} color="white" />,
            label: "settings.rate_us",
            tag: false,
            tag_label: "",
            onPress: () => { }
        },
        {
            icon: <MaterialIcons name="connect-without-contact" size={28} color="white" />,
            label: "settings.contact_us",
            tag: false,
            tag_label: "",
            onPress: handlePress
        },
        {
            icon: <MaterialIcons name="follow-the-signs" size={28} color="white" />,
            label: "settings.follow_us",
            tag: false,
            tag_label: "",
            onPress: () => { }
        },
        {
            icon: <MaterialIcons name="follow-the-signs" size={28} color="white" />,
            label: "settings.logout",
            tag: false,
            tag_label: "",
            onPress: () => { dispatch(logout()) }
        },
    ];




    /*Lang translation section */


    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language;


    useEffect(() => {
        const loadLanguage = async () => {
            const savedLanguage = await AsyncStorage.getItem("language");
            if (savedLanguage) {
                i18n.changeLanguage(savedLanguage);
            }
        };
        loadLanguage();
    }, [i18n]);

    const changeLanguage = async (lang: string) => {
        await AsyncStorage.setItem("language", lang);
        i18n.changeLanguage(lang);
        handleClosePress();
    };

    return (
        <View className="flex-1 bg-[#A82A00] items-center relative pb-5">
            <Image source={require("@/assets/images/dec-2.png")} className="object-cover absolute -z-[1]" />
            <Image source={require("@/assets/images/dec-1.png")} className="object-cover absolute -z-[2]" />
            <Image source={require("@/assets/images/stars.png")} className="object-center absolute -z-[3]" />
            <SafeAreaView className="flex-1 w-full px-5">
                <View className="relative w-full mb-6">
                    <Text className="text-white text-2xl font-bold mb-8 font-abold text-center">{t('settings.title')}</Text>
                    <TouchableOpacity onPress={() => { router.back() }} className="absolute left-1 top-1 ">
                        <AntDesign name="left" size={28} color="white" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center justify-between mb-6">
                    <View className="flex-row items-center">
                        <Image
                            source={{ uri: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_1.png" }}
                            className="rounded-full w-20 h-20"
                        />
                        <View className="flex-col items-start ml-4">
                            <Text className="text-lg font-aregular text-white">
                                Serkan Admin
                            </Text>
                            <Text className="text-sm text-gray-300 ">
                                admin@tabirle.com
                            </Text>
                        </View>
                    </View>
                    <AntDesign name="right" size={20} color="white" />
                </View>
                {
                    links.map((item, index) => (
                        <TouchableOpacity onPress={item.onPress} key={index} className={`flex-row items-center justify-between py-4 ${index === links.length - 1 ? 'border-b-0' : 'border-b-[1px] border-white/50'}`} >
                            <View className="flex-row items-center">
                                {item.icon}
                                <Text className="text-lg font-aregular text-white ml-3">
                                    {t(item.label)}
                                </Text>
                            </View>
                            <AntDesign name="right" size={20} color="white" />
                        </TouchableOpacity>
                    ))
                }
            </SafeAreaView>
            <StatusBar style="light" />
            <BottomSheet
                ref={langBottomSheetRef}
                index={-1}
                snapPoints={["25%", "50%"]}
                handleIndicatorStyle={{ backgroundColor: "#A82A00" }}
                backgroundStyle={{ backgroundColor: "#FDDD85" }}
            >
                <BottomSheetView
                    className="flex-1 px-9 py-2 items-center "
                >
                    {flags.map(({ lang, name }) => (
                        <TouchableOpacity
                            key={name}
                            onPress={() => changeLanguage(lang)}
                            className={` w-full p-3 flex-row gap-2 justify-between items-center `}
                        >
                            <Text className="text-[#A82A00] font-aregular text-xl ">{name}</Text>
                            {currentLanguage === lang && <AntDesign name="checkcircleo" size={24} color="#A82A00" />}
                        </TouchableOpacity>
                    ))}

                </BottomSheetView>
            </BottomSheet>
        </View>
    )
}