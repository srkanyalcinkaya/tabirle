import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from '@expo/vector-icons/Feather';
import { router } from "expo-router";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { api } from "@/api";
import { useDispatch } from "react-redux";
import { setState } from "@/redux/reducers/app/appSlice";
import Indicator from "@/components/Indicator";
export default function Register() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const dispatch = useDispatch();
    const handleSingUp = () => {
        // console.log("Kayıt olunuyor yapılıyor:", form);
        // router.push("/(auth)/welcome")

        if (form.password === form.confirmPassword) {

            setIsLoading(true)
            if (
                form.email.trim().length == 0 || form.password.trim().length == 0 || form.confirmPassword.trim().length == 0
            ) {
                setIsLoading(false)
                // Toast.show({
                //     type: "errorToast",
                //     text1: "Hata",
                //     text2: "Eksik yerler var lütfen hepsini giriniz!",

                // })
            } else {
                api.post("auth/register", form)
                    .then(res => {
                        dispatch(setState({
                            name: res?.data?.name,
                            email: res?.data?.email,
                            credit: res?.data?.credit,
                            isLogged: true,
                            user_id: res?.data?.user_id,
                            token: res?.data?.token,
                            birth_of_time: res.data.birth_of_time,
                            date_of_birth: res.data.date_of_birth,
                            gender: res.data.gender,
                            relationship_status: res.data.relationship_status,
                            zodiacSign: res.data.zodiacSign,
                            isCompletedWelcome: res.data.isCompletedWelcome
                        }))
                        setIsLoading(false)
                        router.push("/(auth)/welcome")
                        // console.log(res.data)
                    }).catch(error => {
                        setIsLoading(false)
                        // Toast.show({
                        //     type: "errorToast",
                        //     text1: "Hata",
                        //     text2: error?.response?.data.message,

                        // })
                    })
            }
        } else {
            setError("Şifreler uyuşmuyor lütfen tekrar giriniz!")
        }
    };


    return (
        <View className="flex-1 bg-[#A82A00] items-center relative  pb-5">
            <Image source={require("@/assets/images/dec-2.png")} className="object-cover absolute z-[1]" />
            <Image source={require("@/assets/images/dec-1.png")} className="object-cover absolute z-[2]" />
            <Image source={require("@/assets/images/stars.png")} className="object-center absolute z-[3]" />


            <SafeAreaView className="absolute z-10 flex-1  w-full px-5 py-20 flex-col justify-center">


                <View className="flex-col items-center justify-center gap-y-5 ">
                    <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} source={require("@/assets/images/logo.png")} className="h-20 w-20  object-cover" />
                    <Animated.Text entering={FadeInUp.delay(200).duration(1000).springify()} className="text-4xl font-pregular text-white pt-3  ">
                        Tabirle
                    </Animated.Text>
                </View>
                <View className="flex-col gap-y-10 mt-5">
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className=" h-16 bg-[#FDC11C] rounded-2xl p-4 font-aregular text-[#A82A00] text-xl ">
                        <TextInput
                            onChangeText={(value) => setForm({ ...form, ["email"]: value })}
                            value={form["email"] || ''}
                            placeholder="Enter your email"
                            autoCapitalize="none"
                            placeholderTextColor={"#A82A00"}
                            className="h-full w-80 font-aregular text-[#A82A00] text-xl"
                        />

                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="relative h-16 bg-[#FDC11C] rounded-2xl p-4 font-aregular text-[#A82A00] text-xl ">
                        <TextInput
                            onChangeText={(value) => setForm({ ...form, ["password"]: value })}
                            value={form["password"] || ''}
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

                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="relative h-16 bg-[#FDC11C] rounded-2xl p-4 font-aregular text-[#A82A00] text-xl ">
                        <TextInput
                            onChangeText={(value) => setForm({ ...form, ["confirmPassword"]: value })}
                            value={form["confirmPassword"] || ''}
                            placeholder="Confirm your password"
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
                    {error &&
                        <Text className="text-base mt-1 text-white p-3 font-aregular">
                            *{error}
                        </Text>
                    }

                    <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
                        <TouchableOpacity disabled={isLoading || !form.email || !form.confirmPassword || !form.password} onPress={() => handleSingUp()} className={`bg-[#FDC11C] p-4 rounded-2xl w-full `}>
                            {
                                isLoading ?
                                    <Indicator color="white" count={5} size={10} />
                                    :
                                    <Text className="text-white text-2xl font-aregular text-center">SingUp</Text>
                            }
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="mt-10 items-center justify-center flex-row gap-2">
                        <Text className="text-white">
                            Already have an account?
                        </Text>
                        <Text className="text-[#FDC11C] " onPress={() => { router.replace('/login'); }}>
                            Login
                        </Text>
                    </Animated.View>

                </View>
            </SafeAreaView>
        </View>
    )
}