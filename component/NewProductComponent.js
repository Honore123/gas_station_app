import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  Picker,
  StyleSheet,
  Modal,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Input, Button, Card } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { connect } from "react-redux";
import { postProduct } from "../redux/ActionCreators";
import ValidationComponent from "react-native-form-validator";

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    materials: state.materials,
    vendors: state.vendors,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postProduct: (product) => dispatch(postProduct(product)),
});

class NewProduct extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      category_id: "",
      material_id: "",
      unit: "piece",
      vendor_id: "",
      product_name: "",
      quantity: "",
      retail_price: "",
      purchase_price: "",
      images: {
        image1: "",
        image2: "",
        image3: "",
        image4: "",
      },
      description: "",
      loadingImage: false,
      isLoading: false,
    };
  }
  getImageFromCamera = async () => {
    const cameraPermsission = await ImagePicker.requestCameraPermissionsAsync();
    const cameraRollPermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (
      cameraPermsission.status === "granted" &&
      cameraRollPermission.status === "granted"
    ) {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
      });
      if (!capturedImage.cancelled) {
        console.log(capturedImage);
        this.setState({ loadingImage: true });
        const manipResult = await ImageManipulator.manipulateAsync(
          capturedImage.uri,
          [],
          { compress: 0.3, format: ImageManipulator.SaveFormat.JPEG }
        );
        this.setState({ loadingImage: false });
        if (this.state.images.image1 === "") {
          this.setState({
            images: { ...this.state.images, image1: manipResult },
          });

          return;
        }
        if (this.state.images.image2 === "") {
          this.setState({
            images: { ...this.state.images, image2: manipResult },
          });
          return;
        }
        if (this.state.images.image3 === "") {
          this.setState({
            images: { ...this.state.images, image3: manipResult },
          });
          return;
        }
        if (this.state.images.image4 === "") {
          this.setState({
            images: { ...this.state.images, image4: manipResult },
          });
          return;
        }
      }
    }
  };
  handleSubmit() {
    this.validate({
      category_id: { numbers: true, required: true },
      material_id: { numbers: true, required: true },
      vendor_id: { numbers: true, required: true },
      product_name: { required: true },
      quantity: { numbers: true, required: true },
      retail_price: { numbers: true, required: true },
      purchase_price: { numbers: true, required: true },
      images: {
        image1: { required: true },
        image2: { required: true },
        image3: { required: true },
        image4: { required: true },
      },
    });
    if (!this.isFormValid()) {
      Alert.alert("Error!", "Please fill all fields", [
        {
          text: "OK",
          onPress: () => this.setState({ isLoading: false }),
        },
      ]);
    } else {
      this.setState({ isLoading: true });
      this.props.postProduct(this.state).then(() => {
        this.setState({
          category_id: "",
          material_id: "",
          vendor_id: "",
          product_name: "",
          quantity: "",
          retail_price: "",
          purchase_price: "",
          images: {
            image1: "",
            image2: "",
            image3: "",
            image4: "",
          },
          description: "",
          isLoading: false,
        });
      });
    }
  }
  render() {
    const { categories } = this.props.categories;
    const { materials } = this.props.materials;
    const { vendors } = this.props.vendors;
    return (
      <ScrollView style={style.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.loadingImage}
        >
          <TouchableWithoutFeedback>
            <View style={style.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <ActivityIndicator size="large" color="#181461" />
              <Text>Loading Image</Text>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isLoading}
        >
          <TouchableWithoutFeedback>
            <View style={style.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <ActivityIndicator size="large" color="#181461" />
              <Text>Loading</Text>
            </View>
          </View>
        </Modal>
        <View style={style.pickerView}>
          <Picker
            selectedValue={this.state.vendor_id}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ vendor_id: itemValue });
            }}
          >
            <Picker.Item label="Vendor" value="" color="#A8A8A8" />
            {vendors.map((vendor) => (
              <Picker.Item
                key={vendor.id}
                label={vendor.names}
                value={vendor.id}
              />
            ))}
          </Picker>
        </View>
        <View style={style.pickerView}>
          <Picker
            selectedValue={this.state.category_id}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ category_id: itemValue });
            }}
          >
            <Picker.Item label="Product Category" value="" color="#A8A8A8" />
            {categories.map((category) => (
              <Picker.Item
                key={category.id}
                label={category.category_name}
                value={category.id}
              />
            ))}
          </Picker>
        </View>
        <View style={style.pickerView}>
          <Picker
            selectedValue={this.state.material_id}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ material_id: itemValue });
            }}
          >
            <Picker.Item label="Material" value="" color="#A8A8A8" />
            {materials.map((material) => (
              <Picker.Item
                key={material.id}
                label={material.material_type}
                value={material.id}
              />
            ))}
          </Picker>
        </View>
        <Input
          placeholder="Product name"
          value={this.state.product_name}
          onChangeText={(name) => {
            this.setState({ product_name: name });
          }}
          style={{ marginTop: 25, fontSize: 15 }}
        />
        <Input
          placeholder="Quantity"
          style={style.inputStyle}
          value={this.state.quantity}
          onChangeText={(quantity) => {
            this.setState({ quantity: quantity });
          }}
          keyboardType="number-pad"
        />
        <Input
          placeholder="Retail price"
          style={style.inputStyle}
          value={this.state.retail_price}
          onChangeText={(retailPrice) => {
            this.setState({ retail_price: retailPrice });
          }}
          keyboardType="number-pad"
        />
        <Input
          placeholder="Purchase price"
          style={style.inputStyle}
          value={this.state.purchase_price}
          onChangeText={(purchasePrice) => {
            this.setState({ purchase_price: purchasePrice });
          }}
          keyboardType="number-pad"
        />
        <Input
          placeholder="Description"
          style={style.inputStyle}
          value={this.state.description}
          onChangeText={(description) => {
            this.setState({ description: description });
          }}
        />
        <View style={style.albumContainer}>
          <View style={style.imageContainer}>
            <View style={{ flex: 1 }}>
              <Card>
                <Card.Image
                  source={
                    this.state.images.image1 === ""
                      ? require("./images/necklace.jpg")
                      : { uri: this.state.images.image1.uri }
                  }
                  style={{ height: 120 }}
                ></Card.Image>
              </Card>
            </View>
            <View style={{ flex: 1 }}>
              <Card>
                <Card.Image
                  source={
                    this.state.images.image2 === ""
                      ? require("./images/necklace.jpg")
                      : { uri: this.state.images.image2.uri }
                  }
                  style={{ height: 120 }}
                ></Card.Image>
              </Card>
            </View>
          </View>
          <View style={style.imageContainer}>
            <View style={{ flex: 1 }}>
              <Card>
                <Card.Image
                  source={
                    this.state.images.image3 === ""
                      ? require("./images/necklace.jpg")
                      : { uri: this.state.images.image3.uri }
                  }
                  style={{ height: 120 }}
                ></Card.Image>
              </Card>
            </View>
            <View style={{ flex: 1 }}>
              <Card>
                <Card.Image
                  source={
                    this.state.images.image4 === ""
                      ? require("./images/necklace.jpg")
                      : { uri: this.state.images.image4.uri }
                  }
                  style={{ height: 120 }}
                ></Card.Image>
              </Card>
            </View>
          </View>
        </View>
        <Button
          title="Take image"
          onPress={this.getImageFromCamera}
          containerStyle={{ marginTop: 20 }}
        />

        <Button
          title="Save product"
          containerStyle={{ marginTop: 50, marginBottom: 50 }}
          buttonStyle={{ backgroundColor: "#17A2B8" }}
          onPress={() => this.handleSubmit()}
        />
      </ScrollView>
    );
  }
}
const style = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  pickerView: {
    marginTop: 20,
    marginRight: 10,
    marginLeft: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#A8A8A8",
  },
  inputStyle: {
    fontSize: 15,
  },
  albumContainer: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);
