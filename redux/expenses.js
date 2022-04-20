import * as ActionTypes from "./actionTypes";

export const expenses = (
  state = {
    isLoading: false,
    errMess: null,
    expenses: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.REQUEST_EXPENSES:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };
    case ActionTypes.ADD_EXPENSES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        expenses: action.payload,
      };
    case ActionTypes.ADD_EXPENSE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        expenses: state.expenses.concat(action.payload),
      };
    case ActionTypes.EXPENSES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };
    default:
      return state;
  }
};
