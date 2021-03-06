import axios from 'axios';

//GETS
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

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({
        type: 'GET_DETAILS',
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//POST
export function postDog(payload) {
  return async function (dispatch) {
    const response = await axios.post('http://localhost:3001/dog', payload);
    return response;
  };
}

//SEARCH
export function searchDogs(search) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/dogs?name=${search}`)
      .then((dogs) => {
        dispatch({
          type: 'SEARCH_DOGS',
          payload: dogs.data,
        });
      })

      .catch(() => {
        alert('Doggie not found!');
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
