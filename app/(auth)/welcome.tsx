import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { api } from "@/api";
import { setState } from "@/redux/reducers/app/appSlice";
import Indicator from "@/components/Indicator";
import { useAccount } from "@/redux/reducers/app/hooks";
import { getAscendantSign, getZodiacSign } from "@/lib";
import { useTranslation } from "react-i18next";


export default function Welcome() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { email } = useAccount();

    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        name: "",
        date_of_birth: new Date(),
        birth_of_time: new Date(),
        gender: "male",
        relationship_status: "in-elationship",
        zodiacSign: "",
        ascendantSign: ""
    });
    const [error, setError] = useState<string>("")

    const totalSteps = 5;

    const handleNext = () => {
        if (step === 1) {
            if (form.name !== "") {
                setStep(prevStep => Math.min(prevStep + 1, totalSteps));
                setError("");
            } else {
                setError(t('name_error'));
            }
        }
        if (step === 2) {
            if (form.date_of_birth) {
                setStep(prevStep => Math.min(prevStep + 1, totalSteps));
                setError("");
                setForm({ ...form, zodiacSign: getZodiacSign(form.date_of_birth) });
            } else {
                setError(t('dob_error'));
            }
        }
        if (step === 3) {
            if (form.birth_of_time) {
                setStep(prevStep => Math.min(prevStep + 1, totalSteps));
                setError("");
            } else {
                setError(t('time_error'));
            }
        }
        if (step === 4) {
            if (form.gender !== "") {
                setStep(prevStep => Math.min(prevStep + 1, totalSteps));
                setError("");
            } else {
                setError(t('gender_error'));
            }
        }
        if (step === 5) {
            if (form.relationship_status !== "") {
                setStep(prevStep => Math.min(prevStep + 1, totalSteps));
                setError("");
            } else {
                setError(t('relationship_error'));
            }
        }
    };

    const handlePrevious = () => {
        setStep(prevStep => Math.max(prevStep - 1, 1));
    };

    // Calculate progress percentage
    const progressPercentage = Math.round((step / totalSteps) * 100);

    const renderStepIndicator = () => {
        const indicators = [];
        for (let i = 1; i <= totalSteps; i++) {
            indicators.push(
                <View key={i} className="flex-row items-center">
                    <View className={`h-2 w-10 rounded-full items-center justify-center mr-3 
                                ${i <= step ? 'bg-[#DAA520]' : 'bg-white'}`}>

                    </View>
                    {/* {i < totalSteps && (
                        <View className={`h-1 w-5 ${i < step ? 'bg-[#DAA520]' : 'bg-gray-500'}`} />
                    )} */}

                </View>
            );
        }
        return (
            <View className="flex-row items-center justify-center">
                <View className="flex-row justify-center items-center6">{indicators}</View>
                <Text className="text-white font-aregular text-xl ml-3   ">{progressPercentage}%</Text>
            </View>
        );
    };


    const genders = [
        { id: 'male', label: t("genders.male") },
        { id: 'female', label: t("gender.female") },
        { id: 'other', label: t("gender.other") },
    ];


    const relationship_status = [
        { id: 'in-relationship', label: t("relationship_status.in-relationship") },
        { id: 'single', label: t("relationship_status.single") },
        { id: 'married', label: t("relationship_status.married") },
        { id: 'engaged', label: t("relationship_status.engaged") },
    ];


    const onChangeDate = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        // setShow(false);
        setForm({ ...form, ["date_of_birth"]: currentDate });
    };
    const onChangeTime = (event: any, selectedDate: any) => {
        const currentDate = new Date(selectedDate);
        // setShow(false);
        setForm({ ...form, ["birth_of_time"]: currentDate });
    };

    const handleSumbit = () => {
        //console.log(form)
        // 
        setIsLoading(true)

        api.post("auth/welcome", { ...form, email: email })
            .then(res => {
                dispatch(setState({
                    name: res.data.user.name,
                    birth_of_time: res.data.user.birth_of_time,
                    date_of_birth: res.data.user.date_of_birth,
                    gender: res.data.user.gender,
                    relationship_status: res.data.user.relationship_status,
                    zodiacSign: res.data.user.zodiacSign,
                    isCompletedWelcome: res.data.user.isCompletedWelcome
                }))

                setIsLoading(false)
                router.push("/(tabs)/home")
                //console.log(res.data)
            }).catch(error => {
                //console.log(error?.response?.data.message)
                setIsLoading(false)
                // Toast.show({
                //     type: "errorToast",
                //     text1: "Hata",
                //     text2: error?.response?.data.message,

                // })
            })

    }

    const [zodiacImage, setZodiacImage] = useState(null);
    const [zodiacName, setZodiacName] = useState<"aries" | "taurus" | "gemini" | "cancer" | "leo" | "virgo" | "libra" | "scorpio" | "sagittarius" | "capricorn" | "aquarius" | "pisces" | "">("");

    useEffect(() => {
        if (form.date_of_birth) {
            const zodiac = getZodiacSign(form.date_of_birth);
            setZodiacName(zodiac);

            switch (zodiac) {
                case "aries":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-3.png"));
                    break;
                case "taurus":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-1.png"));
                    break;
                case "gemini":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-2.png"));
                    break;
                case "cancer":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-12.png"));
                    break;
                case "leo":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-9.png"));
                    break;
                case "virgo":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-6.png"));
                    break;
                case "libra":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-11.png"));
                    break;
                case "scorpio":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-8.png"));
                    break;
                case "sagittarius":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-4.png"));
                    break;
                case "capricorn":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-5.png"));
                    break;
                case "aquarius":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-10.png"));
                    break;
                case "pisces":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-7.png"));
                    break;
                default:
                    setZodiacImage(null);
                    break;
            }
        }
    }, [form.date_of_birth]);


    useEffect(() => {

        setForm({ ...form, ascendantSign: getAscendantSign(form.birth_of_time) });
        if (form.birth_of_time) {
            const ascendan = getAscendantSign(form.birth_of_time);


            switch (ascendan) {
                case "aries":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-3.png"));
                    break;
                case "taurus":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-1.png"));
                    break;
                case "gemini":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-2.png"));
                    break;
                case "cancer":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-12.png"));
                    break;
                case "leo":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-9.png"));
                    break;
                case "virgo":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-6.png"));
                    break;
                case "libra":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-11.png"));
                    break;
                case "scorpio":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-8.png"));
                    break;
                case "sagittarius":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-4.png"));
                    break;
                case "capricorn":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-5.png"));
                    break;
                case "aquarius":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-10.png"));
                    break;
                case "pisces":
                    setZodiacImage(require("@/assets/images/horoscope/horoscope-7.png"));
                    break;
                default:
                    setZodiacImage(null);
                    break;
            }
        }
    }, [form.birth_of_time]);


    return (
        <View className="flex-1 bg-[#A82A00] items-center relative  pb-5">
            <Image source={require("@/assets/images/dec-2.png")} className="object-cover absolute z-[1]" />
            <Image source={require("@/assets/images/dec-1.png")} className="object-cover absolute z-[2]" />
            <Image source={require("@/assets/images/stars.png")} className="object-center absolute z-[3]" />
            <Loader isLoading={loading} />

            <SafeAreaView className="abolsute z-10 flex-1 w-full px-5">
                <View className="items-center justify-center my-5">
                    {step === 1 && <Text className="text-white font-aregular text-2xl">{t('welcome.step1')}</Text>}
                    {step === 2 && <Text className="text-white font-aregular text-2xl">{t('welcome.step2')}</Text>}
                    {step === 3 && <Text className="text-white font-aregular text-2xl">{t('welcome.step3')}</Text>}
                    {step === 4 && <Text className="text-white font-aregular text-2xl">{t('welcome.step4')}</Text>}
                    {step === 5 && <Text className="text-white font-aregular text-2xl">{t('welcome.step5')}</Text>}
                </View>

                {renderStepIndicator()}


                <View className="flex-1 items-center justify-center">
                    {step === 1 &&
                        <View className="flex-1 justify-start flex-col mt-6 ">
                            <Text className="font-aregular text-center text-white text-xl ">
                                {t('welcome.step_info_1')}
                            </Text>
                            <TextInput
                                // style={styles.input}
                                onChangeText={(value) => setForm({ ...form, ["name"]: value })}
                                value={form["name"] || ''}
                                placeholder={t('welcome.name_placeholder')}
                                autoComplete="off"
                                className="h-16 bg-[#FDC11C] rounded-2xl p-4 font-aregular text-[#A82A00] text-xl mt-5"
                            />
                            <Text className="text-base mt-1 text-white p-3 font-aregular">
                                *{error}
                            </Text>
                        </View>
                    }
                    {step === 2 &&
                        <View className="flex-1 justify-start flex-col mt-6 ">
                            <Text className="font-aregular text-center text-white text-xl ">
                                {t('welcome.step_info_2')}
                            </Text>
                            <View className="flex-row items-center justify-center mt-10 gap-2">
                                {/* <Image className="h-24 w-24  " source={require("@/assets/images/horoscope/horoscope-1.png")} /> */}
                                <View className="flex-col items-center">
                                    {zodiacImage && (
                                        <Image
                                            source={zodiacImage}
                                            className="h-36  w-36 rounded-full "
                                        />
                                    )}
                                    {zodiacName && <Text className="mt-2 font-aregular text-white text-2xl capitalize ">{zodiacName}</Text>}

                                </View>
                                {/* <Image className="h-24 w-24  " source={require("@/assets/images/horoscope/horoscope-1.png")} /> */}
                            </View>
                            <View className="mt-4">
                                <DateTimePicker
                                    value={form.date_of_birth}
                                    mode={'date'}
                                    display="spinner"
                                    onChange={onChangeDate}
                                    textColor="white"

                                />
                            </View>
                            <Text className="text-base mt-1 text-white p-3 font-aregular">
                                *{error}
                            </Text>
                        </View>}
                    {step === 3 &&
                        <View className="flex-1 justify-start flex-col mt-6 ">
                            <Text className="font-aregular text-center text-white text-xl ">
                                {t('welcome.step_info_3')}
                            </Text>
                            <View className="flex-row items-center justify-center mt-10 gap-2">
                                {/* <Image className="h-24 w-24  " source={require("@/assets/images/horoscope/horoscope-1.png")} /> */}
                                <View className="flex-col items-center">
                                    {zodiacImage && (
                                        <Image className="h-36  w-36 rounded-full " source={zodiacImage} />
                                    )}

                                    <Text className="mt-2 font-aregular text-white text-2xl capitalize ">{zodiacName}</Text>
                                </View>
                                {/* <Image className="h-24 w-24  " source={require("@/assets/images/horoscope/horoscope-1.png")} /> */}
                            </View>
                            <View className="mt-4">
                                <DateTimePicker
                                    value={form.birth_of_time}
                                    mode={'time'}
                                    display="spinner"
                                    textColor="white"
                                    onChange={onChangeTime}
                                />
                            </View>
                            <Text className="text-base mt-1 text-white p-3 font-aregular">
                                *{error}
                            </Text>
                        </View>
                    }
                    {step === 4 &&
                        <View className="flex-1 justify-start items-center flex-col mt-6 w-full">
                            <Image className="h-40 w-40 rounded-full items-center mb-4" source={require("@/assets/images/gender.png")} />

                            <Text className="font-aregular text-center text-white text-xl ">
                                {t('welcome.step_info_4')}
                            </Text>
                            <View className="flex-col gap-2 w-full mt-4">
                                {genders.map((gender) => (
                                    <TouchableOpacity
                                        key={gender.id}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingVertical: 12,
                                            paddingHorizontal: 16,
                                            marginVertical: 6,
                                            borderWidth: 2,
                                            borderColor: form.gender === gender.id ? '#DAA520' : '#A3542A',
                                            borderRadius: 8,
                                            backgroundColor: form.gender === gender.id ? 'rgba(218, 165, 32, 0.1)' : 'transparent',
                                        }}
                                        onPress={() => setForm({ ...form, ["gender"]: gender.id })}
                                    >
                                        <View
                                            style={{
                                                height: 20,
                                                width: 20,
                                                borderRadius: 10,
                                                borderWidth: 2,
                                                borderColor: form.gender === gender.id ? '#DAA520' : '#FFFFFF',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginRight: 12,
                                            }}
                                        >
                                            {form.gender === gender.id && (
                                                <View
                                                    style={{
                                                        height: 10,
                                                        width: 10,
                                                        borderRadius: 5,
                                                        backgroundColor: '#DAA520',
                                                    }}
                                                />
                                            )}
                                        </View>
                                        <Text style={{ color: '#FFFFFF', fontSize: 16 }}>{gender.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text className="text-base mt-1 text-white p-3 font-aregular">
                                *{error}
                            </Text>
                        </View>
                    }
                    {step === 5 &&
                        <View className="flex-1 justify-start items-center flex-col mt-6 w-full">
                            <Image className="h-40 w-40 rounded-full items-center mb-4" source={require("@/assets/images/relationship.png")} />

                            <Text className="font-aregular text-center text-white text-xl ">
                                {t('welcome.step_info_5')}
                            </Text>
                            <View className="flex-col gap-2 w-full mt-4">
                                {relationship_status.map((relationship) => (
                                    <TouchableOpacity
                                        key={relationship.id}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingVertical: 12,
                                            paddingHorizontal: 16,
                                            marginVertical: 6,
                                            borderWidth: 2,
                                            borderColor: form.relationship_status === relationship.id ? '#DAA520' : '#A3542A',
                                            borderRadius: 8,
                                            backgroundColor: form.relationship_status === relationship.id ? 'rgba(218, 165, 32, 0.1)' : 'transparent',
                                        }}
                                        onPress={() => setForm({ ...form, ["relationship_status"]: relationship.id })}
                                    >
                                        <View
                                            style={{
                                                height: 20,
                                                width: 20,
                                                borderRadius: 10,
                                                borderWidth: 2,
                                                borderColor: form.relationship_status === relationship.id ? '#DAA520' : '#FFFFFF',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginRight: 12,
                                            }}
                                        >
                                            {form.relationship_status === relationship.id && (
                                                <View
                                                    style={{
                                                        height: 10,
                                                        width: 10,
                                                        borderRadius: 5,
                                                        backgroundColor: '#DAA520',
                                                    }}
                                                />
                                            )}
                                        </View>
                                        <Text style={{ color: '#FFFFFF', fontSize: 16 }}>{relationship.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text className="text-base mt-1 text-white p-3 font-aregular">
                                *{error}
                            </Text>
                        </View>
                    }
                </View>

                {/* Navigation buttons */}
                <View className="flex flex-row justify-between mt-8 ">
                    {step > 1 && (
                        <TouchableOpacity onPress={handlePrevious} className="border border-[#DAA520] w-44    p-6 rounded-2xl">
                            <Text className="text-[#DAA520] text-2xl text-center font-aregular">{t("welcome.back")}</Text>
                        </TouchableOpacity>
                    )}
                    {step < totalSteps ? (
                        <TouchableOpacity onPress={handleNext} className={`bg-[#DAA520] p-6 rounded-2xl ${step > 1 ? "w-44 " : "w-full"}`}>
                            <Text className="text-[#8C2F00] text-2xl font-aregular text-center  ">{t("welcome.next")}</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => handleSumbit()} className={`bg-[#DAA520] p-6 rounded-2xl w-44`}>
                            {
                                isLoading ?
                                    <Indicator count={4} color="white" size={8} />
                                    :
                                    <Text className="text-[#8C2F00] text-2xl font-aregular text-center">{t("welcome.done")}</Text>
                            }
                        </TouchableOpacity>
                    )}
                </View>
            </SafeAreaView>
            <StatusBar style="light" />
        </View>
    )
}   