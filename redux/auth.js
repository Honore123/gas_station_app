import * as ActionTypes from "./actionTypes";

export const auth = (
  state = {
    isLoading: false,
    isAuthenticated: false,
    errMess: null,
    user: null,
    token: "",
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.REQUEST_LOGIN:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMess: action.payload,
      };
    case ActionTypes.REQUEST_LOGOUT:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMess: null,
        user: null,
        token: "",
      };
    case ActionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };
    default:
      return state;
  }
};
