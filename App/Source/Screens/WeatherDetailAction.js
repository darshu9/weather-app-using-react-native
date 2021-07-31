import * as ActionTypes from './ActionTypes';
import {weatherApiKey} from '../Constants/index';
import axios from 'axios';


export const getWeatherDetails = (latitude, longitude) => {
  return async dispatch => {
    dispatch({type: ActionTypes.GET_WEATHER_LOADER, payload: ''});
    const lat = latitude;
    const lon = longitude;
    const baseURL= 'https://api.openweathermap.org';
      axios({
        method: 'GET',
        url: `${baseURL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely&appid=${weatherApiKey}`,
        headers: {
            'Content-Type': 'application/json',
        },
    })
      .then(response => {
        if (response) {
          dispatch({
            type: ActionTypes.GET_WEATHER_SUCCESS,
            payload: response.data,
          });
        } else {
          dispatch({type: ActionTypes.GET_WEATHER_FAILURE, payload: 'error'});
        }
      })
      .then();
  };
};

export const getLocation = value => {
  return dispatch => {
    if (value) {
      dispatch({type: ActionTypes.GET_LOCATION_SUCCESS, payload: value});
    } else {
      dispatch({type: ActionTypes.GET_LOCATION_FAILURE, payload: 'error'});
    }
  };
};
