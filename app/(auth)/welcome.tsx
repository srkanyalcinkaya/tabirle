import Loader from "@/components/Loader";
import { useState } from "react";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from "expo-router";


export default function Welcome() {

    // eğer kullanıcı varsa yönlendirme yapacak
    // if (!loading && isLogged) return <Redirect href="/home" />;
    const [loading, setLoading] = useState(false);

    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        name: "",
        date_of_birth: new Date(),
        birth_of_time: new Date(),
        gender: "male",
        relationship_status: "in-elationship",
    });
    const [error, setError] = useState<string>("")

    const totalSteps = 5;

    const handleNext = () => {
        if (step === 1) {
            if (form.name !== "") {
                setStep(prevStep => Math.min(prevStep + 1, totalSteps));
                setError("")
            } else {
                setError("Lütfen isminizi giriniz")
            }
        }
        if (step === 2) {
            if (form.date_of_birth) {
                setStep(prevStep => Math.min(prevStep + 1, totalSteps));
                setError("")
            } else {
                setError("Lütfen doğum tarihinizi seçiniz")
            }
        }
        if (step === 3) {
            if (form.birth_of_time) {
                setStep(prevStep => Math.min(prevStep + 1, totalSteps));
                setError("")
            } else {
                setError("Lütfen doğum saatinizi seçiniz")
            }
        }
        if (step === 4) {
            if (form.gender !== "") {
                setStep(prevStep => Math.min(prevStep + 1, totalSteps));
                setError("")
            } else {
                setError("Lütfen cinsiyetinizi belirtiniz")
            }
        }
        if (step === 5) {
            if (form.relationship_status !== "") {
                setStep(prevStep => Math.min(prevStep + 1, totalSteps));
                setError("")
            } else {
                setError("Lütfen ilişki durumunu belirtiniz")
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
        { id: 'male', label: 'Male' },
        { id: 'female', label: 'Female' },
        { id: 'other', label: 'Other' },
    ];


    const relationship_status = [
        { id: 'in-elationship', label: 'In Relationship' },
        { id: 'single', label: 'Single' },
        { id: 'married', label: 'Married' },
        { id: 'engaged', label: 'Engaged' },
    ];


    const onChangeDate = (event:any, selectedDate:any) => {
        const currentDate = selectedDate;
        // setShow(false);
        setForm({...form, ["date_of_birth"]:currentDate});
    };
    const onChangeTime = (event:any, selectedDate:any) => {
        const currentDate = new Date(selectedDate);
        // setShow(false);
        setForm({...form, ["birth_of_time"]:currentDate});
    };

    const handleSumbit = () => {
        console.log(form)
        router.push("/(tabs)/home")
    }



    return (
        <View className="flex-1 bg-[#A82A00] items-center relative  pb-5">
            <Image source={require("@/assets/images/dec-2.png")} className="object-cover absolute z-[1]" />
            <Image source={require("@/assets/images/dec-1.png")} className="object-cover absolute z-[2]" />
            <Image source={require("@/assets/images/stars.png")} className="object-center absolute z-[3]" />
            <Loader isLoading={loading} />

            <SafeAreaView className="abolsute z-10 flex-1 w-full px-5">
                <View className="items-center justify-center my-5">
                    {step === 1 && <Text className="text-white font-aregular text-2xl">Your Name</Text>}
                    {step === 2 && <Text className="text-white font-aregular text-2xl">Date of Birth</Text>}
                    {step === 3 && <Text className="text-white font-aregular text-2xl">Birth of Time</Text>}
                    {step === 4 && <Text className="text-white font-aregular text-2xl">Your Gender</Text>}
                    {step === 5 && <Text className="text-white font-aregular text-2xl">Relationship Status</Text>}
                </View>

                {renderStepIndicator()}


                <View className="flex-1 items-center justify-center">
                    {step === 1 &&
                        <View className="flex-1 justify-start flex-col mt-6 ">
                            <Text className="font-aregular text-center text-white text-xl ">
                                Tell us about yourself so that we can make a more personalised prediction.
                            </Text>
                            <TextInput
                                // style={styles.input}
                                onChangeText={(value) => setForm({ ...form, ["name"]: value })}
                                value={form["name"] || ''}
                                placeholder="Enter your name"
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
                                Date is important for determining your sun sign, numerology and compatibility.
                            </Text>
                            <View className="flex-row items-center justify-center mt-10 gap-2">
                                <Image className="h-24 w-24  " source={require("@/assets/images/horoscope/horoscope-1.png")} />
                                <View className="flex-col items-center">
                                    <Image className="h-36  w-36 rounded-full " source={require("@/assets/images/horoscope/horoscope-1.png")} />
                                    <Text className="mt-2 font-aregular text-white text-2xl ">Scorpio</Text>
                                </View>
                                <Image className="h-24 w-24  " source={require("@/assets/images/horoscope/horoscope-1.png")} />
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
                                Time is important for determining your houses, rising sign, and exact moon position.
                            </Text>
                            <View className="flex-row items-center justify-center mt-10 gap-2">
                                <Image className="h-24 w-24  " source={require("@/assets/images/horoscope/horoscope-1.png")} />
                                <View className="flex-col items-center">
                                    <Image className="h-36  w-36 rounded-full " source={require("@/assets/images/horoscope/horoscope-1.png")} />
                                    <Text className="mt-2 font-aregular text-white text-2xl ">Scorpio</Text>
                                </View>
                                <Image className="h-24 w-24  " source={require("@/assets/images/horoscope/horoscope-1.png")} />
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
                                It will reveal the balance of your masculine and feminine energy.
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
                                Your current status provides insights into your love life.
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
                            <Text className="text-[#DAA520] text-2xl text-center font-aregular">Back</Text>
                        </TouchableOpacity>
                    )}
                    {step < totalSteps ? (
                        <TouchableOpacity onPress={handleNext} className={`bg-[#DAA520] p-6 rounded-2xl ${step > 1 ? "w-44 " : "w-full"}`}>
                            <Text className="text-[#8C2F00] text-2xl font-aregular text-center  ">Next</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => handleSumbit()} className={`bg-[#DAA520] p-6 rounded-2xl w-44`}>
                            <Text className="text-[#8C2F00] text-2xl font-aregular text-center">Done</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </SafeAreaView>
            {/* <StatusBar backgroundColor="#161622" style="light" /> */}
        </View>
    )
}   