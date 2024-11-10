import {AnimationObject} from 'lottie-react-native';

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: require('../assets/animations/Lottie-1.json'),
    text: 'Lorem Ipsum dolor sit amet',
    textColor: 'white',
    backgroundColor: '#ffa3ce',
  },
  {
    id: 2,
    animation: require('../assets/animations/Lottie-2.json'),
    text: 'Lorem Ipsum dolor sit amet',
    textColor: 'white',
    backgroundColor: '#bae4fd',
  },
  {
    id: 3,
    animation: require('../assets/animations/Lottie-3.json'),
    text: 'Lorem Ipsum dolor sit amet',
    textColor: 'white',
    backgroundColor: '#faeb8a',
  },
];

export default data;