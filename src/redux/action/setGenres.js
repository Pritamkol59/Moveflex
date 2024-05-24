

export const SET_SELECTED_GENRE = 'SET_SELECTED_GENRE';

export const setSelectedGenre = (genreId) => ({
  type: SET_SELECTED_GENRE,
  payload: genreId,
});
