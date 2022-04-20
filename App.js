import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
import { PersistGate } from "redux-persist/es/integration/react";
import { Text, View } from "react-native";
import "react-native-gesture-handler";
import Main from "./component/MainComponent";
import { Loading } from "./component/LoadingComponent";
import { useFonts } from "expo-font";

const { persistor, store } = ConfigureStore();

export default function App() {
  const [loaded] = useFonts({
    Nunito: require("./assets/fonts/Nunito-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}
