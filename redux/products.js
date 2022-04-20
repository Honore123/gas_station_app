import * as ActionTypes from "./actionTypes";

export const products = (
  state = {
    isLoading: false,
    errMess: null,
    products: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.REQUEST_PRODUCTS:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };
    case ActionTypes.ADD_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        products: action.payload,
      };
    case ActionTypes.ADD_PRODUCT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        products: state.products.concat(action.payload),
      };
    case ActionTypes.PRODUCTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };
    case ActionTypes.PRODUCTS_SOLD:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        products: state.products.map((product) => {
          var found = action.payload.find((s) => s.product_id === product.id);
          if (found) {
            return { ...product, quantity: product.quantity - found.quantity };
          }
          return product;
        }),
      };
    default:
      return state;
  }
};
