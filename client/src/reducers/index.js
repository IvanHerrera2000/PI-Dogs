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

    default:
      return { ...state };
  }
}

export default rootReducer;
