import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

export default function Page() {
  const { id } = useLocalSearchParams();
  // console.log(id)
  return (
    <View>
      <Text>Detail AStro</Text>
    </View>
  )
}