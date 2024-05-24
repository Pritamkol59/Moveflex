import { combineReducers } from 'redux';
import setGenresReducer from './setGenresReducer';


const rootReducer = combineReducers({
   
    setSelectedGenre:setGenresReducer,

});

export default rootReducer;
