import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from '@expo/vector-icons/Feather';
import { router } from "expo-router";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useDispatch } from 'react-redux';
import { api } from "@/api";
import { setState } from "@/redux/reducers/app/appSlice";
import Indicator from "@/components/Indicator";


export default function Login() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleLogin = () => {
        setIsLoading(true)
        if (
            form.email.trim().length == 0 || form.password.trim().length == 0
        ) {
            setIsLoading(false)
            // Toast.show({
            //     type: "errorToast",
            //     text1: "Hata",
            //     text2: "Eksik yerler var lütfen hepsini giriniz!",

            // })
        } else {
            api.post("auth/login", form)
                .then(res => {
                    dispatch(setState({
                        name: res.data.user.name,
                        email: res.data.user.email,
                        credit: res.data.user.credit,
                        isLogged: true,
                        user_id: res.data.user.user_id,
                        token: res.data.user.token,
                        date_of_birth: res.data.user.date_of_birth,
                        birth_of_time: res.data.user.birth_of_time,
                        gender: res.data.user.gender,
                        relationship_status: res.data.user.relationship_status,
                        zodiacSign: res.data.user.zodiacSign,
                        isCompletedWelcome: res.data.user.isCompletedWelcome,
                        zodiac_features:res.data.user.zodiac_features
                    }));
                    router.push("/home")
                    setIsLoading(false)
                }).catch(error => {
                    console.log(error?.response?.data.message)
                    setIsLoading(false)
                    // Toast.show({
                    //     type: "errorToast",
                    //     text1: "Hata",
                    //     text2: error?.response?.data.message,

                    // })
                })
        }
    };

    return (
        <View className="flex-1 bg-[#A82A00] items-center relative  pb-5">
            <Image source={require("@/assets/images/dec-2.png")} className="object-cover absolute z-[1]" />
            <Image source={require("@/assets/images/dec-1.png")} className="object-cover absolute z-[2]" />
            <Image source={require("@/assets/images/stars.png")} className="object-center absolute z-[3]" />


            <SafeAreaView className="absolute z-10 flex-1  w-full px-5 py-20 flex-col justify-center">

                <View className="flex-col items-center justify-center ">
                    <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} source={require("@/assets/images/logo.png")} className="h-20 w-20  object-cover" />
                    <Animated.Text entering={FadeInUp.delay(200).duration(1000).springify()} className="text-4xl font-pregular text-white  pt-5">
                        Tabirle
                    </Animated.Text>
                </View>
                <View className="flex mt-5">
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className=" h-16 bg-[#FDC11C] rounded-2xl p-4 font-aregular text-[#A82A00] text-xl ">
                        <TextInput
                            onChangeText={(value) => setForm({ ...form, ["email"]: value })}
                            value={form["email"] || ''}
                            autoCapitalize="none"
                            placeholder="Enter your email"
                            placeholderTextColor={"#A82A00"}
                            className="h-full w-80 font-aregular text-[#A82A00] text-xl"
                        />

                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="relative h-16 bg-[#FDC11C] rounded-2xl p-4 font-aregular text-[#A82A00] text-xl mt-5">
                        <TextInput
                            onChangeText={(value) => setForm({ ...form, ["password"]: value })}
                            value={form["password"] || ''}
                            autoCapitalize="none"
                            placeholder="Enter your password"
                            secureTextEntry={!showPassword}
                            placeholderTextColor={"#A82A00"}
                            className="h-full w-80 font-aregular text-[#A82A00] text-xl "
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2">
                            {showPassword ?
                                <Feather name="eye-off" size={24} color="#A82A00" />
                                :
                                <Feather name="eye" size={24} color="#A82A00" />
                            }
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
                        <TouchableOpacity disabled={isLoading || !form.email || !form.password} onPress={() => handleLogin()} className={`bg-[#FDC11C] p-4 rounded-2xl w-full mt-12`}>
                            {
                                isLoading ?
                                    <Indicator size={10} color={"white"} count={5} />
                                    :
                                    <Text className="text-white text-2xl font-aregular text-center">Login</Text>
                            }
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="mt-10 items-center justify-center flex-row gap-2">
                        <Text className="text-white">
                            Don't have an account?
                        </Text>
                        <Text className="text-[#FDC11C] " onPress={() => { router.replace('/(auth)/register'); }}>
                            SingUp
                        </Text>
                    </Animated.View>

                </View>
            </SafeAreaView>
            <StatusBar style="light" />
        </View>
    )
}