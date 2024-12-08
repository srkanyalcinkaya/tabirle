import React from "react"
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
export default function Indicator({ size, count, color }: { size: number, color: string, count?: number }) {
    return (
        <DotIndicator color={color} count={count} size={size} />
    )
}