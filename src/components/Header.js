import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


import normalize from 'react-native-normalize';
import Colors from '../theams/Colors';
import { setSelectedGenre } from '../redux/action/setGenres';


const Header = () => {
  const [genres, setGenres] = useState([]);
  const selectedGenre = useSelector((state) => state.setSelectedGenre.selectedGenre);
  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/genre/movie/list?language=en',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWI3ODIyYWJmNzgzOGRmNDBlZTc2MjEyZjY4ZDgyYiIsInN1YiI6IjY2NGUzYzkxOGY4MmVmMWFjNTllZTBiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2_xqTZQkCKadbs6dWXWP6yylPYo4ZdWyUIwFTE24eMc',
      },
    };

    axios
      .request(options)
      .then((response) => {
        const allGenres = [{ id: 0, name: 'All' }, ...response.data.genres];
        setGenres(allGenres);
        
        dispatch(setSelectedGenre(0));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>MOVIEFIX</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {genres.map((genre) => (
          <TouchableOpacity
            key={genre.id}
            style={[styles.menubox, selectedGenre === genre.id && styles.selectedMenu]}
            onPress={() => dispatch(setSelectedGenre(genre.id))}
          >
            <Text style={styles.menutex}>{genre.name.split(' ')[0]}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray,
    height: normalize(150),
    width: '100%',
  },
  text: {
    marginTop: normalize(20),
    fontWeight: 'bold',
    fontSize: normalize(28),
    color: Colors.red,
    paddingLeft: normalize(16),
  },
  scrollViewContent: {
    paddingHorizontal: normalize(16),
    paddingTop: normalize(43),
  },
  menubox: {
    borderWidth: normalize(1),
    borderColor: Colors.black,
    padding: normalize(8),
    borderRadius: normalize(7),
    alignItems: 'center',
    backgroundColor: Colors.menucolor,
    width: normalize(90),
    height: normalize(42),
    marginRight: normalize(10),
    justifyContent: 'center',
  },
  selectedMenu: {
    backgroundColor: Colors.red,
  },
  menutex: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: normalize(15),
  },
});
