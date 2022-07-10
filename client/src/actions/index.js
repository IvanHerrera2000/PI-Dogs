import axios from 'axios';

// renderiza los dogs en el home
export function getDogs() {
  return async function (dispatch) {
    var json = await axios.get('http://localhost:3001/dogs');
    return dispatch({
      type: 'GET_DOGS',
      payload: json.data,
    });
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    var temp = await axios.get('http://localhost:3001/temperament');
    return dispatch({
      type: 'GET_TEMPERAMENTS',
      payload: temp.data,
    });
  };
}

//FILTERS
export function filterCreated(payload) {
  return {
    type: 'FILTER_CREATED',
    payload,
  };
}

export function filterTemperament(payload) {
  return {
    type: 'FILTER_TEMPERAMENT',
    payload,
  };
}

//SORTS
export function orderAlphabetical(payload) {
  return {
    type: 'ORDER_ALPHABETICAL',
    payload,
  };
}

export function orderByWeight(payload) {
  return {
    type: 'ORDER_BY_WEIGHT',
    payload,
  };
}
