/*
 * @Author: lianglonghui_i lianglonghui_i
 * @Date: 2025-11-21 16:26:50
 * @LastEditors: lianglonghui_i lianglonghui_i
 * @LastEditTime: 2025-11-21 21:04:58
 * @FilePath: /rn-app/app/(tabs)/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { View, Image, ScrollView, Text, ActivityIndicator, FlatList } from 'react-native'
import { SearchBar } from '@/components/search-bar'
import { useRouter } from 'expo-router'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import MovieCard from '@/components/movie-card'

export default function Index() {
  const router = useRouter()

  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({ query: '' }))
  return (
    <View className="flex-1 bg-primary ">
      <Image className="absolute z-0 w-full" source={images.bg} />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: '100%',
          paddingBottom: 10,
        }}
      >
        <Image className="mx-auto mb-5 mt-20 h-10 w-12" source={icons.logo}></Image>
        {moviesLoading ? (
          <ActivityIndicator size="large" color="#0000FF" className="mt-10 self-center" />
        ) : moviesError ? (
          <Text className="mb-3 mt-5 text-lg font-bold text-white">Error:{moviesError?.message}:</Text>
        ) : (
          <View className="flex-1 ">
            <SearchBar placeholder="搜索电影" onPress={() => router.push('/search')} />
            <>
              <Text className="mb-3 mt-5 text-lg font-bold text-white">最新电影</Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item}></MovieCard>}
                keyExtractor={item => item.id?.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'center',
                  marginBottom: 10,
                  paddingHorizontal: 0,
                  gap: 18,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  )
}
