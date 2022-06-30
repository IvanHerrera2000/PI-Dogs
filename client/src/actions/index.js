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
