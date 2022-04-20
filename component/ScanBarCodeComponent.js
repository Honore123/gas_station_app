import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";

class ScanBarCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      scanned: false,
      type: Camera.Constants.Type.back,
      flashLight: "off",
    };
  }

  async componentDidMount() {
    this.getPermissionAsync();
  }
  getPermissionAsync = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasPermission: status === "granted" });
  };

  // async componentDidMount() {
  //   this.getPermissionAsync();
  // }
  // getPermissionAsync = async () => {
  //   const { status } = await BarCodeScanner.requestPermissionsAsync();
  //   this.setState({ hasPermission: status === "granted" });
  // };
  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    this.props.navigation.navigate("Add Product", { barcode: data });
  };
  render() {
    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={this.state.type}
          flashMode={this.state.flashLight}
          onBarCodeScanned={
            this.state.scanned ? undefined : this.handleBarCodeScanned
          }
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.state.flashLight == "off"
                  ? this.setState({ flashLight: "torch" })
                  : this.setState({ flashLight: "off" });
              }}
            >
              <Text style={styles.text}> Flash </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
      // <BarCodeScanner
      //   onBarCodeScanned={
      //     this.state.scanned ? undefined : this.handleBarCodeScanned
      //   }
      //   style={StyleSheet.absoluteFill}
      // />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
export default ScanBarCode;
