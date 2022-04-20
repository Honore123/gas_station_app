import * as ActionTypes from "./actionTypes";

export const categories = (
  state = {
    isLoading: false,
    errMess: null,
    categories: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.REQUEST_CATEGORIES:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };
    case ActionTypes.ADD_CATEGORIES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        categories: action.payload,
      };
    case ActionTypes.CATEGORIES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };
    default:
      return state;
  }
};
