import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import previewReducer from './previewReducer';
import userReducer from './userReducer';
const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    preview:previewReducer
});

export default rootReducer;