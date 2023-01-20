import React, { Component } from "react";
import {
  View,
  Text,
  Picker,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Card, Button, Input, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { addCart } from "../redux/ActionCreators";
import ValidationComponent from "react-native-form-validator";

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addCart: (product) => dispatch(addCart(product)),
});

class AddProduct extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      barcode: "",
      quantity: "1",
      product_name: "",
      retail_price: "",
      total_price: null,
      max_quantity: null,
      product_id: null,
      product_exist: false,
    };
  }
  componentDidMount() {
    this._focusListener = this.props.navigation.addListener("focus", () => {
      const { products } = this.props.products;
      const { barcode } = this.props.route.params;
      if (barcode != "00") {
        this.setState({ barcode: barcode });

        products.filter((product) =>
          product.barcode === barcode
            ? this.setState({
                product_id: product.id,
                product_name: product.product_name,
                retail_price: product.retail_price,
                max_quantity: parseInt(product.quantity),
                total_price:
                  parseInt(this.state.quantity) * product.retail_price,
                product_exist: true,
              })
            : this.setState({ product_exist: false })
        );
      }
    });
  }
  // selProduct(selProduct) {
  //   const { products } = this.props.products;
  //   products.filter((product) =>
  //     product.id === selProduct
  //       ? this.setState({
  //           product_id: product.id,
  //           product_name: product.product_name,
  //           retail_price: product.retail_price,
  //           max_quantity: parseInt(product.quantity),
  //           total_price: parseInt(this.state.quantity) * product.retail_price,
  //           product_exist: true,
  //         })
  //       : this.setState({ product_exist: false })
  //   );
  // }
  handleAddToCart() {
    const { quantity, product_id, product_name, total_price, max_quantity } =
      this.state;
    this.validate({
      quantity: { numbers: true, required: true },
      product_id: { numbers: true, required: true },
    });
    if (!this.isFormValid()) {
      Alert.alert("Error!", "Please fill all fields", [
        {
          text: "OK",
          onPress: () => console.log("clicked ok"),
        },
      ]);
    } else if (max_quantity < parseInt(quantity)) {
      Alert.alert(
        "Error!",
        "The entered quantity exceeds stock quantity! stock quantity is " +
          max_quantity,
        [
          {
            text: "OK",
            onPress: () => console.log("clicked ok"),
          },
        ]
      );
    } else {
      this.props.addCart({ quantity, product_id, product_name, total_price });
      this.setState({
        barcode: "",
        quantity: "",
        product_name: "",
        retail_price: "",
        total_price: null,
        max_quantity: null,
        product_id: null,
        product_exist: false,
      });
      this.props.navigation.navigate("Cart List");
    }
  }
  render() {
    const { products } = this.props.products;
    return (
      <ScrollView>
        <Card containerStyle={styles.cardHolder}>
          {/* <View style={styles.pickerView}>
            <Picker
              selectedValue={this.state.product_id}
              onValueChange={(itemValue, itemIndex) => {
                this.selProduct(itemValue);
              }}
            >
              <Picker.Item label="Select Product" value="" color="#A8A8A8" />
              {products.map((product, index) => (
                <Picker.Item
                  key={index}
                  label={product.product_name}
                  value={product.id}
                />
              ))}
            </Picker>
          </View> */}
          <Input
            placeholder="Barcode"
            keyboardType="number-pad"
            inputContainerStyle={{
              borderStyle: "solid",
              borderColor: "#ced4da",
              borderWidth: 1,
              borderRadius: 15,
              paddingLeft: 20,
              height: 60,
            }}
            inputStyle={{
              fontFamily: "Quicksand-Regular",
              fontSize: 17,
            }}
            value={this.state.barcode}
            onChangeText={(barcode) => this.setState({ barcode: barcode })}
            rightIcon={() => (
              <Icon
                name="qrcode"
                type="ant-design"
                size={30}
                onPress={() => this.props.navigation.navigate("Scan Barcode")}
              />
            )}
          />
          <Input
            placeholder="Quantity"
            keyboardType="number-pad"
            inputContainerStyle={{
              borderStyle: "solid",
              borderColor: "#ced4da",
              borderWidth: 1,
              borderRadius: 15,
              paddingLeft: 20,
              height: 60,
            }}
            inputStyle={{
              fontFamily: "Quicksand-Regular",
              fontSize: 17,
            }}
            maxLength={this.state.max_quantity}
            value={this.state.quantity}
            onChangeText={(quantity) =>
              this.setState({
                quantity: quantity,
                total_price: parseInt(quantity) * this.state.retail_price,
              })
            }
          />
          <View style={styles.container}>
            <View style={styles.containerBtn}>
              <Button
                title="Cancel"
                titleStyle={{
                  fontFamily: "Quicksand-Medium",
                  color: "#FF0404",
                  fontSize: 17,
                }}
                containerStyle={{ flex: 1 }}
                buttonStyle={{
                  backgroundColor: "#FFF",
                  borderWidth: 1,
                  borderColor: "#FF0404",
                  borderRadius: 10,
                  height: 60,
                }}
              />
              <View style={{ flex: 1 }}></View>
              <Button
                title="Add"
                titleStyle={{ fontFamily: "Quicksand-Medium", fontSize: 17 }}
                containerStyle={{ flex: 1 }}
                buttonStyle={{
                  backgroundColor: "#17A2B8",
                  height: 60,
                  borderRadius: 10,
                }}
                onPress={() => this.handleAddToCart()}
              />
            </View>
          </View>
        </Card>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  cardHolder: {
    paddingTop: 30,
    marginBottom: 30,
    borderRadius: 15,
  },
  container: {
    marginTop: 30,
    marginBottom: 20,
    flex: 1,
  },
  containerBtn: {
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  pickerView: {
    marginVertical: 20,
    marginRight: 10,
    marginLeft: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#A8A8A8",
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
