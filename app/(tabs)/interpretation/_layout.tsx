
import React from 'react'
import { Stack } from 'expo-router'

export default function InterpretationLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
            <Stack.Screen name="index" />
            <Stack.Screen name="detail" />
        </Stack>
    )
}