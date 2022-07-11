const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_DOGS':
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    case 'GET_TEMPERAMENTS':
      return {
        ...state,
        temperaments: action.payload,
      };

    case 'SEARCH_DOGS':
      return {
        ...state,
        dogs: action.payload,
      };

    case 'FILTER_CREATED':
      const allDogsCreated = state.allDogs;
      const createdFilter =
        action.payload === 'created'
          ? allDogsCreated.filter((element) => element.userCreated)
          : allDogsCreated.filter((element) => !element.userCreated);
      //console.log(allDogs)
      return {
        ...state,
        dogs: action.payload === 'all' ? allDogsCreated : createdFilter,
      };

    case 'FILTER_TEMPERAMENT':
      const allDogs = state.allDogs;
      const temperamentsFilter =
        action.payload === 'all'
          ? allDogs
          : allDogs.filter((element) => {
              return element.temperament?.split(', ').includes(action.payload);
            });
      //console.log(temperamentsFilter)
      return {
        ...state,
        dogs: temperamentsFilter,
      };

    case 'ORDER_ALPHABETICAL':
      let sortAlphabetical =
        action.payload === 'upward'
          ? state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortAlphabetical,
      };

    case 'ORDER_BY_WEIGHT':
      let sortWeight =
        action.payload === 'weightUpward'
          ? state.dogs.sort(function (a, b) {
              return b.weight_min - a.weight_min;
            })
          : state.dogs.sort(function (a, b) {
              return a.weight_min - b.weight_min;
            });
      return {
        ...state,
        dogs: sortWeight,
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
