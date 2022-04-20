import * as ActionTypes from "./actionTypes";

export const materials = (
  state = {
    isLoading: false,
    errMess: null,
    materials: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.REQUEST_MATERIALS:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };
    case ActionTypes.ADD_MATERIALS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        materials: action.payload,
      };
    case ActionTypes.MATERIALS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };
    default:
      return state;
  }
};
