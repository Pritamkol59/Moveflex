import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import normalize from 'react-native-normalize';
import Colors from '../theams/Colors';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

const Movidetailes = () => {
  const [movies, setMovies] = useState([]);
  const [currentYear, setCurrentYear] = useState(2012);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const flatListRef = useRef(null);
  const selectedGenre = useSelector((state) => state.setSelectedGenre.selectedGenre);
  const previousGenreRef = useRef(selectedGenre);
  useEffect(() => {
    // selectedGenre?setMovies([]):null;
    if (previousGenreRef.current !== selectedGenre) {
      setLoading(true);
      setMovies([]);
      setCurrentYear(2012);
      previousGenreRef.current = selectedGenre;
    }
    fetchMoviesByYear(currentYear, selectedGenre);
    console.log('this is geniid:'+selectedGenre)
  }, [currentYear, selectedGenre]);

  const fetchMoviesByYear = useCallback((year,selectedGenre) => {
    setLoading(true);

    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/discover/movie?include_video=true&page=1&primary_release_year=${year}&sort_by=primary_release_date.desc&vote_count.gte=100&with_genres=${selectedGenre !== 0 ? selectedGenre : ''}`,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWI3ODIyYWJmNzgzOGRmNDBlZTc2MjEyZjY4ZDgyYiIsInN1YiI6IjY2NGUzYzkxOGY4MmVmMWFjNTllZTBiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2_xqTZQkCKadbs6dWXWP6yylPYo4ZdWyUIwFTE24eMc'
      }
    };

    axios.request(options)
      .then(response => {
        setMovies(prevMovies => [
          ...prevMovies,
          ...response.data.results.filter(
            newMovie => !prevMovies.some(prevMovie => prevMovie.id === newMovie.id)
          ).slice(0, 20) 
        ]);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item, index }) => {
    const showYearHeader = index === 0 || new Date(item.release_date).getFullYear() !== new Date(movies[index - 1]?.release_date).getFullYear(); 

    if (index % 2 === 0) {
      return (
        <View>
          {showYearHeader && ( 
            <Text style={styles.date}>{new Date(item.release_date).getFullYear()}</Text>
          )}
          <View style={styles.row}>
            <MovieCard movie={item} />
            {movies[index + 1] && <MovieCard movie={movies[index + 1]} />}
          </View>
        </View>
      );
    }
    return null;
  };

  const MovieCard = ({ movie }) => (
    <View style={styles.card}>
      <ImageBackground source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.image}>
        <View style={styles.overlay}>
          <Text style={styles.movieName}>{movie.title}</Text>
          
          <Text style={styles.rating}>Rating: <StarRatingDisplay
        rating={movie.vote_average}
        starSize={normalize(18)}
      /></Text>
        </View>
      </ImageBackground>
    </View>
  );

  const handleEndReached = () => {
    console.log('Loading more movies for year:', currentYear + 1);
    setLoading(true);
    setCurrentYear(prevYear => prevYear + 1);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.9} 
        ListFooterComponent={loading && <ActivityIndicator size="large" color={Colors.white} />}
      />
    </View>
  );
};

export default Movidetailes;

const styles = StyleSheet.create({
  container: {
    marginTop: normalize(10),
    paddingHorizontal: normalize(16),
    flex: 1,
  },
  date: {
    color: Colors.white,
    fontSize: normalize(24),
    fontWeight: 'bold',
    marginBottom: normalize(20),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(20),
  },
  card: {
    backgroundColor: Colors.gray,
    borderRadius: normalize(8),
    width: '48%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: normalize(250),
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: normalize(10),
    flex: 1,
    justifyContent: 'flex-end',
  },
  movieName: {
    color: Colors.white,
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  rating: {
    color: Colors.white,
    fontSize: normalize(14),
    marginTop: normalize(4),
  },
});

