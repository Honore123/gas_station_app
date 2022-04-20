import * as ActionTypes from "./actionTypes";

export const sales = (
  state = {
    isLoading: false,
    errMess: null,
    sales: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_SALES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        sales: action.payload,
      };
    case ActionTypes.ADD_SALE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        sales: state.sales.concat(action.payload),
      };
    case ActionTypes.SALES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };
    case ActionTypes.REQUEST_CHECKOUT:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };
    case ActionTypes.CHECKOUT_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };
    default:
      return state;
  }
};
