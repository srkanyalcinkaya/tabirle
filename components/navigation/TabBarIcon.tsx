// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import { Image, Text, View } from 'react-native';

export function TabBarIcon({ style, focused, color, name, ...rest }: {,IconProps<ComponentProps<typeof Ionicons>['name']>}) {
  // return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
  return (
    <View className="flex items-center justify-center gap-2">
      <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  )
}
