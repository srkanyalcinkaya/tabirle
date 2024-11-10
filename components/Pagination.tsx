import { View } from 'react-native';
import React from 'react';
import { SharedValue } from 'react-native-reanimated';
import { OnboardingData } from '../data/data';
import Dot from './Dot';

type Props = {
    data: OnboardingData[];
    x: SharedValue<number>;
};
const Pagination = ({ data, x }: Props) => {
    return (
        <View className='flex-row h-10 justify-center items-center'>
            {data.map((_, index) => {
                return <Dot index={index} x={x} key={index} />;
            })}
        </View>
    );
};

export default Pagination;

