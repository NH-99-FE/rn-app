import MovieCard from '@/components/movie-card'
import { images } from '@/constants/images'
import { View, Image, FlatList, ActivityIndicator, Text } from 'react-native'
import useFetch from '@/hooks/useFetch'
import { fetchMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import { SearchBar } from '@/components/search-bar'
import { useEffect, useState } from 'react'
import useDebounce from '@/hooks/useDebounce'
const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  // 防抖处理
  const deboucedSearchQuery = useDebounce(searchQuery, 500)
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: deboucedSearchQuery }), false)

  useEffect(() => {
    const fetchWithQuery = async () => {
      if (deboucedSearchQuery && deboucedSearchQuery.trim()) {
        await loadMovies()
      } else {
        reset()
      }
    }
    fetchWithQuery()
  }, [deboucedSearchQuery])

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full flex-1" resizeMode="cover" />
      <FlatList
        data={movies || []}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={item => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          marginVertical: 16,
          gap: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className="mt-20 w-full flex-row items-center justify-center">
              <Image className="h-10 w-12" source={icons.logo} />
            </View>
            <View className="my-5">
              <SearchBar placeholder="搜索电影" onPress={() => {}} value={searchQuery} onChangeText={text => setSearchQuery(text)} />
            </View>
            {moviesLoading && <ActivityIndicator size="large" color="#0000FF" className="mt-10 self-center" />}
            {moviesError && <Text className="my-3 px-5 text-red-500">Error:{moviesError?.message}:</Text>}
            {!moviesLoading && !moviesError && deboucedSearchQuery.trim() && movies?.length > 0 && (
              <Text className="mr-2 font-bold text-white">
                <Text className="text-accent">{deboucedSearchQuery}</Text>
                的搜索结果
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {deboucedSearchQuery.trim() ? '没有找到相关电影，换个关键词试试吧~' : '请输入关键词搜索电影吧~'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  )
}

export default Search
