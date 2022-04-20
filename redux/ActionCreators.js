import { Alert } from "react-native";
import * as ActionTypes from "./actionTypes";
import { baseUrl } from "../shared/baseUrl";

//Authentication #login
export const loginUser = (creds) => (dispatch) => {
  dispatch(requestLogin());
  return fetch(baseUrl + "users/login", {
    method: "post",
    body: JSON.stringify(creds),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error("Wrong credentials");
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.user) {
        dispatch(fetchSales(response.token));
        dispatch(receiveLogin(response));
      } else {
        var error = new Error("Error " + response.message);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => {
      dispatch(loginError(error.message));
      Alert.alert("Error!", error.message, [
        {
          text: "OK",
          onPress: () => console.log("clicked ok"),
        },
      ]);
    });
};

export const requestLogin = () => ({
  type: ActionTypes.REQUEST_LOGIN,
});
export const receiveLogin = (response) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload: response,
});
export const loginError = (errmess) => ({
  type: ActionTypes.LOGIN_FAILURE,
  payload: errmess,
});

//Authentication #logout
export const logoutUser = (token) => (dispatch) => {
  dispatch(requestLogout());
  const bearer = "Bearer " + token;
  return fetch(baseUrl + "users/logout", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: bearer,
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error("Error occured");
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.message) {
        dispatch(receiveLogout());
      } else {
        var error = new Error("Error " + response.message);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => {
      dispatch(receiveLogout());
      Alert.alert("Logout error", error.message, [
        {
          text: "OK",
          onPress: () => console.log("Clicked ok"),
        },
      ]);

      dispatch(logoutError(error.message));
    });
};

export const requestLogout = () => ({
  type: ActionTypes.REQUEST_LOGOUT,
});
export const receiveLogout = () => ({
  type: ActionTypes.LOGOUT_SUCCESS,
});
export const logoutError = (errmess) => ({
  type: ActionTypes.LOGOUT_FAILURE,
  payload: errmess,
});

// Product Categories
export const fetchCategories = () => (dispatch) => {
  dispatch(requestCategories());
  return fetch(baseUrl + "categories")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((categories) => dispatch(addCategories(categories)))
    .catch((error) => {
      Alert.alert("Error!", error.message, [
        {
          text: "OK",
          onPress: () => console.log("clicked ok"),
        },
      ]);
      dispatch(categoriesFailed(error.message));
    });
};

export const requestCategories = () => ({
  type: ActionTypes.REQUEST_CATEGORIES,
});

export const addCategories = (categories) => ({
  type: ActionTypes.ADD_CATEGORIES,
  payload: categories,
});
export const categoriesFailed = (errmess) => ({
  type: ActionTypes.CATEGORIES_FAILED,
  payload: errmess,
});

//Product Materials

export const fetchMaterials = () => (dispatch) => {
  dispatch(requestMaterials());
  return fetch(baseUrl + "materials")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((materials) => dispatch(addMaterials(materials)))
    .catch((error) => {
      Alert.alert("Error!", error.message, [
        {
          text: "OK",
          onPress: () => console.log("clicked ok"),
        },
      ]);
      dispatch(materialsFailed(error.message));
    });
};

export const requestMaterials = () => ({
  type: ActionTypes.REQUEST_MATERIALS,
});

export const addMaterials = (materials) => ({
  type: ActionTypes.ADD_MATERIALS,
  payload: materials,
});
export const materialsFailed = (errmess) => ({
  type: ActionTypes.MATERIALS_FAILED,
  payload: errmess,
});

//Product Vendors

export const fetchVendors = () => (dispatch) => {
  dispatch(requestVendors());
  return fetch(baseUrl + "vendors")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((vendors) => dispatch(addVendors(vendors)))
    .catch((error) => {
      Alert.alert("Error!", error.message, [
        {
          text: "OK",
          onPress: () => console.log("clicked ok"),
        },
      ]);
      dispatch(vendorsFailed(error.message));
    });
};

export const requestVendors = () => ({
  type: ActionTypes.REQUEST_VENDORS,
});

export const addVendors = (vendors) => ({
  type: ActionTypes.ADD_VENDORS,
  payload: vendors,
});
export const vendorsFailed = (errmess) => ({
  type: ActionTypes.VENDORS_FAILED,
  payload: errmess,
});

// Products

export const fetchProducts = () => (dispatch) => {
  dispatch(requestProducts());
  return fetch(baseUrl + "products")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error: " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((products) => dispatch(addProducts(products)))
    .catch((error) => {
      Alert.alert("Error!", error.message, [
        {
          text: "OK",
          onPress: () => console.log("clicked ok"),
        },
      ]);
      dispatch(productsFailed(error.message));
    });
};

export const postProduct = (product) => (dispatch) => {
  dispatch(requestProducts());
  const data = new FormData();
  const { image1, image2, image3, image4 } = product.images;
  if (image1 != "") {
    data.append("image1", {
      name: "building1",
      type: "image/jpg",
      uri: image1.uri,
    });
  } else {
    data.append("image1", null);
  }
  if (image2 != "") {
    data.append("image2", {
      name: "building2",
      type: "image/jpg",
      uri: image2.uri,
    });
  } else {
    data.append("image2", null);
  }
  if (image3 != "") {
    data.append("image3", {
      name: "building3",
      type: "image/jpg",
      uri: image3.uri,
    });
  } else {
    data.append("image3", null);
  }
  if (image4 != "") {
    data.append("image4", {
      name: "building4",
      type: "image/jpg",
      uri: image4.uri,
    });
  } else {
    data.append("image4", null);
  }
  data.append("product", JSON.stringify(product));
  console.log(data);
  return fetch(baseUrl + "products", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error(
          "Error " + response.status + ": " + response.statusText
        );
        error.response = response;
        throw error;
      }
    })
    .then((response) => response.json())
    .then((product) => dispatch(addProduct(product)))
    .catch((error) => {
      Alert.alert("Error!", error.message, [
        {
          text: "OK",
          onPress: () => console.log("clicked ok"),
        },
      ]);
      dispatch(productsFailed(error.message));
    });
};

export const requestProducts = () => ({
  type: ActionTypes.REQUEST_PRODUCTS,
});

export const addProducts = (products) => ({
  type: ActionTypes.ADD_PRODUCTS,
  payload: products,
});
export const addProduct = (product) => ({
  type: ActionTypes.ADD_PRODUCT,
  payload: product,
});
export const productsFailed = (error) => ({
  type: ActionTypes.PRODUCTS_FAILED,
  payload: error,
});

// Cart

export const addCart = (cart) => ({
  type: ActionTypes.ADD_CART,
  payload: cart,
});
export const removeCart = (cart) => ({
  type: ActionTypes.REMOVE_CART,
  payload: cart,
});
export const emptyCart = () => ({
  type: ActionTypes.EMPTY_CART,
});

//Checkout - Sales actions
export const fetchSales = (token) => (dispatch) => {
  dispatch(requestCheckout());
  const bearer = "Bearer " + token;
  return fetch(baseUrl + "sales", {
    headers: {
      Accept: "application/json",
      Authorization: bearer,
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((sales) => dispatch(addSales(sales)))
    .catch((error) => {
      Alert.alert("Error!", error.message, [
        {
          text: "OK",
          onPress: () => console.log("clicked ok"),
        },
      ]);
      dispatch(salesFailed(error.message));
    });
};

export const checkoutSale = (token, products) => (dispatch) => {
  dispatch(requestCheckout());
  const bearer = "Bearer " + token;
  return fetch(baseUrl + "sales/checkout", {
    method: "POST",
    body: JSON.stringify(products),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: bearer,
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((sale) => {
      dispatch(productSold(products.products));
      dispatch(addSale(sale));
    })
    .then(() => dispatch(emptyCart()))
    .catch((error) => {
      Alert.alert("Error!", error.message, [
        {
          text: "OK",
          onPress: () => console.log("clicked ok"),
        },
      ]);
      dispatch(checkoutFailed(error.message));
    });
};

export const requestCheckout = () => ({
  type: ActionTypes.REQUEST_CHECKOUT,
});
export const checkoutFailed = (errmess) => ({
  type: ActionTypes.CHECKOUT_FAILED,
  payload: errmess,
});

export const productSold = (products) => ({
  type: ActionTypes.PRODUCTS_SOLD,
  payload: products,
});

export const addSale = (sale) => ({
  type: ActionTypes.ADD_SALE,
  payload: sale,
});

export const addSales = (sales) => ({
  type: ActionTypes.ADD_SALES,
  payload: sales,
});
export const salesFailed = (errmess) => ({
  type: ActionTypes.SALES_FAILED,
  payload: errmess,
});

// Expenses actions

export const fetchExpenses = () => (dispatch) => {
  dispatch(requestExpenses());
  return fetch(baseUrl + "expenses")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((expenses) => dispatch(addExpenses(expenses)))
    .catch((error) => {
      Alert.alert("Error!", error.message, [
        {
          text: "OK",
          onPress: () => console.log("clicked ok"),
        },
      ]);
      dispatch(expensesFailed(error.message));
    });
};

export const postExpense = (expense) => (dispatch) => {
  dispatch(requestExpenses());
  return fetch(baseUrl + "expenses", {
    method: "POST",
    body: JSON.stringify(expense),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((expense) => dispatch(addExpense(expense)))
    .catch((error) => {
      Alert.alert("Error!", error.message, [
        {
          text: "OK",
          onPress: () => console.log("clicked ok"),
        },
      ]);
      dispatch(expensesFailed(error.message));
    });
};

export const requestExpenses = () => ({
  type: ActionTypes.REQUEST_EXPENSES,
});
export const addExpenses = (expenses) => ({
  type: ActionTypes.ADD_EXPENSES,
  payload: expenses,
});
export const addExpense = (expense) => ({
  type: ActionTypes.ADD_EXPENSE,
  payload: expense,
});
export const expensesFailed = (errmess) => ({
  type: ActionTypes.EXPENSES_FAILED,
  payload: errmess,
});
