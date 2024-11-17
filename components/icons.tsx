import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
const CompatibilityIcon = (props:any) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={48}
        height={49}
        fill="none"
        {...props}
    >
        <Path
            fill="url(#a)"
            fillRule="evenodd"
            d="M42 10.93a1.725 1.725 0 1 1-.32 3.434A1.725 1.725 0 0 1 42 10.93ZM4.755 39.37a1.725 1.725 0 1 1 0-3.45 1.725 1.725 0 0 1 0 3.45ZM32.235 16a11.835 11.835 0 0 0-13.5-1.86c-4.5 2.415-7.11 8.355-6.525 15.615a23.401 23.401 0 0 1-6.795-4.98C.33 19.36-1.35 13 1.125 9.025 3.6 5.05 10.23 3.205 15.255 8.62c1.635-7.185 8.265-9 12.42-6.705C31.5 4 33.27 9.505 32.235 16Z"
            clipRule="evenodd"
        />
        <Path
            fill="url(#b)"
            fillRule="evenodd"
            d="M42.645 40C39 44.065 31.8 47.2 25.98 49c-3.63-3.945-7.725-9.285-9.345-14.175-2.34-6.285-1.155-15.465 3.675-17.685a8.415 8.415 0 0 1 10.89 3 10.5 10.5 0 0 1 1.5 3.705c.24-.255.51-.48.705-.705 4.905-4.5 11.07-2.745 13.5 1.125 2.43 3.87.75 10.305-4.26 15.735Zm-3.12-37.38a.69.69 0 0 1 .435-.645.66.66 0 0 1 .765.165l.675.75a.704.704 0 0 0 .525.225h1.005a.675.675 0 0 1 .48 1.185l-.735.675a.66.66 0 0 0-.225.525v1.005a.69.69 0 0 1-1.2.48l-.675-.735a.66.66 0 0 0-.525-.225h-1.005a.705.705 0 0 1-.66-.435.674.674 0 0 1 .18-.765l.735-.675a.66.66 0 0 0 .225-.525V2.62Zm-28.05 42.51a.69.69 0 0 1-1.29 0l-.345-.945a.765.765 0 0 0-.405-.405l-.945-.345a.69.69 0 0 1 0-1.29l.945-.345a.675.675 0 0 0 .405-.405c.09-.225.21-.57.345-.93a.69.69 0 0 1 1.29 0c.135.36.27.705.345.93a.674.674 0 0 0 .405.405l.945.345a.69.69 0 0 1 0 1.29l-.945.345a.765.765 0 0 0-.405.405c-.075.24-.21.585-.345.945Z"
            clipRule="evenodd"
        />
        <Defs>
            <LinearGradient
                id="a"
                x1={5.8}
                x2={29.245}
                y1={13.228}
                y2={35.322}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#FFE98D" />
                <Stop offset={0.1} stopColor="#FED694" />
                <Stop offset={0.91} stopColor="#FC3DD3" />
            </LinearGradient>
            <LinearGradient
                id="b"
                x1={13.366}
                x2={40.493}
                y1={16.939}
                y2={36.057}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#FFE98D" />
                <Stop offset={0.1} stopColor="#FED694" />
                <Stop offset={0.91} stopColor="#FC3DD3" />
            </LinearGradient>
        </Defs>
    </Svg>
)
export default CompatibilityIcon
