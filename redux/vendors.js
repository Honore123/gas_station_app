import * as ActionTypes from "./actionTypes";

export const vendors = (
  state = {
    isLoading: false,
    errMess: null,
    vendors: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.REQUEST_VENDORS:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };
    case ActionTypes.ADD_VENDORS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        vendors: action.payload,
      };
    case ActionTypes.VENDORS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };
    default:
      return state;
  }
};
