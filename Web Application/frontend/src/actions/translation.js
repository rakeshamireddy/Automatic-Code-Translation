
import axios from 'axios';
import { setAlert } from './alert';
import {
  UPDATE_USER,
  UPDATE_USER_ERROR,
} from './types';

// add translations
export const addTranslation = (formData, history) => async(
  dispatch
) => {
  try {
      const config = {
          headers: { 'Content-Type': 'application/json' },
      };
      const res = await axios.put(
          '/api/translation',
          formData,
          config
      );
      dispatch({
          type: UPDATE_USER,
          payload: res.data,
      });
      // dispatch(setAlert(edit ? 'Event Updated' : 'Event Created', 'success'));
      dispatch(setAlert('Translated successfully', 'success'));
      console.log ("returned from axios.post, res.data is ",res.data)
    //   return (res.data)
      history.push('/dashboard');
      // setLoading(true);
      // if (!edit) {
      //     history.push('/restdashboard');
      // }
      // history.push('/viewmenu');
  } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status },
      });
  }
};