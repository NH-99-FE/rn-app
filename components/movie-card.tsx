import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const MovieCard = ({ id, title, poster_path, release_date, vote_average }: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://via.placeholder.com/400x600/1a1a1a/ffffff.png',
          }}
          className=" h-52 w-full rounded-lg"
          resizeMode="cover"
        />
        <Text className="mt-2 overflow-hidden text-sm font-bold text-white" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs font-bold uppercase text-white">{Math.round(vote_average / 2)}</Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="mt-1 text-xs font-medium text-light-300">{release_date?.split('-')[0]}</Text>
          <Text className="text-xs font-medium uppercase text-light-300">Movie</Text>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default MovieCard
