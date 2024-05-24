import { SET_SELECTED_GENRE } from "../action/setGenres"; 

const initialState = {
  selectedGenre: 0,
};

const setGenresReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_GENRE:
      console.log("Action Payload:", action.payload);
      return {
        ...state,
        selectedGenre: action.payload,
        
      };
    default:
      return state;
  }
};

export default setGenresReducer;
