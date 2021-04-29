import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import translation from './translation';

export default combineReducers({
  alert,
  auth, 
  translation
});