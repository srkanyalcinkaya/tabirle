import { AnimationObject } from 'lottie-react-native';

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
  description:string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: require('../assets/animations/Lottie-5.json'),
    text: 'Discover Your Dreams',
    description: "Explore the deep meanings of your dreams. Analyze dream symbols, uncover what your subconscious is telling you, and unlock the secrets of your mind.",
    textColor: '#005b4f',
    backgroundColor: '#ffa3ce',
  },
  {
    id: 2,
    animation: require('../assets/animations/Lottie-2.json'),
    text: 'Embark on a Journey with Zodiac Signs',
    textColor: '#1e2169',
    backgroundColor: '#bae4fd',
    description:"Gain guidance with daily, weekly, and yearly horoscope readings. Discover astrological compatibility with loved ones through the zodiac compatibility test."
  },
  {
    id: 3,
    animation: require('../assets/animations/Lottie-6.json'),
    text: 'Illuminate Your Path with Tarot',
    textColor: '#F15937',
    backgroundColor: '#faeb8a',
    description:"Step into the mysterious world of Tarot cards. Receive daily Tarot guidance for career, love, and general life matters, and connect with your inner wisdom."
  },
];


export default data;