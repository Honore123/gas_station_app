import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistCombineReducers } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";
import { products } from "./products";
import { categories } from "./categories";
import { materials } from "./materials";
import { vendors } from "./vendors";
import { carts } from "./carts";
import { sales } from "./sales";
import { auth } from "./auth";
import { expenses } from "./expenses";
const config = {
  key: "root",
  storage: AsyncStorage,
  debug: true,
};

export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      products,
      categories,
      materials,
      vendors,
      carts,
      sales,
      auth,
      expenses,
    }),
    applyMiddleware(thunk, logger)
  );
  const persistor = persistStore(store);
  return { persistor, store };
};
