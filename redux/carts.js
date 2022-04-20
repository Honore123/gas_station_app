import * as ActionTypes from "./actionTypes";

export const carts = (
  state = {
    isLoading: false,
    errMess: null,
    carts: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_CART:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        carts: state.carts.concat(action.payload),
      };
    case ActionTypes.REMOVE_CART:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        carts: state.carts.filter((cart) => cart.product_id != action.payload),
      };
    case ActionTypes.EMPTY_CART:
      return {
        isLoading: false,
        errMess: null,
        carts: [],
      };
    default:
      return state;
  }
};
