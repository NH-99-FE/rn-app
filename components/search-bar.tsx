/*
 * @Author: lianglonghui_i lianglonghui_i
 * @Date: 2025-11-21 17:24:43
 * @LastEditors: lianglonghui_i lianglonghui_i
 * @LastEditTime: 2025-11-21 17:52:46
 * @FilePath: /rn-app/components/search-bar.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { icons } from '@/constants/icons'

import { View, Image, TextInput } from 'react-native'

interface SearchBarProps {
  placeholder: string
  onPress?: () => void
  value?: string
  onChangeText?: (text: string) => void
}

export const SearchBar = ({ placeholder, onPress, value, onChangeText }: SearchBarProps) => {
  return (
    <View className="flex-row items-center rounded-full bg-dark-200 px-5 py-4">
      <Image className="size-5" source={icons.search} resizeMode="contain" tintColor="#AB8BFF" />
      <TextInput
        className="ml-2 flex-1 text-white"
        placeholder={placeholder}
        placeholderTextColor="#ffffff"
        value={value}
        onPress={onPress}
        onChangeText={onChangeText}
      />
    </View>
  )
}
