import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Picker,
  Alert,
  Modal,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { Card, Button, Input, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { checkoutSale } from "../redux/ActionCreators";
import ValidationComponent from "react-native-form-validator";

const mapStateToProps = (state) => {
  return {
    carts: state.carts,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  checkoutSale: (token, products) => dispatch(checkoutSale(token, products)),
});

class Checkout extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: "",
      paid_amount: this.props.route.params.total_amount,
      discount: 0,
      isLoading: false,
    };
  }

  handleCheckout = () => {
    const { carts } = this.props.carts;
    const { token } = this.props.auth;
    const { total_amount } = this.props.route.params;
    this.setState({ isLoading: true });
    this.validate({
      paymentMethod: { required: true },
    });
    if (!this.isFormValid()) {
      this.setState({ isLoading: false });
      Alert.alert("Error!", "Please fill all fields", [
        {
          text: "OK",
          onPress: () => this.setState({ isLoading: false }),
        },
      ]);
    } else {
      console.log({
        token: token,
        products: carts,
        total_amount: total_amount,
        payment_method: this.state.paymentMethod,
        amount_paid: this.state.paid_amount,
        discount: this.state.discount,
      });
      this.props
        .checkoutSale(token, {
          products: carts,
          total_amount: total_amount,
          payment_method: this.state.paymentMethod,
          amount_paid: this.state.paid_amount,
          discount: this.state.discount,
        })
        .then(() => {
          this.setState({ isLoading: false });
          this.props.navigation.navigate("Sales List");
        });
    }
  };

  render() {
    const { total_amount } = this.props.route.params;
    const { paid_amount } = this.state;
    return (
      <ScrollView>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isLoading}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ActivityIndicator size="large" color="#181461" />
              <Text style={{ fontFamily: "Nunito" }}>Checkout</Text>
            </View>
          </View>
        </Modal>
        <Card>
          <View style={{ marginLeft: 15, marginBottom: 20, marginTop: 10 }}>
            <Text
              style={{
                fontSize: 17,
                marginBottom: 10,
                color: "#949494",
                fontFamily: "Nunito",
              }}
            >
              Total Amount:
            </Text>
            <Text style={{ fontSize: 17, fontFamily: "Nunito" }}>
              {paid_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              Rwf
            </Text>
          </View>
          <View>
            <Text
              style={{
                marginLeft: 15,
                fontSize: 17,
                color: "#949494",
                fontFamily: "Nunito",
              }}
            >
              Discount:
            </Text>
            <View style={styles.pickerView}>
              <Picker
                selectedValue={this.state.discount}
                onValueChange={(itemValue, itemIndex) => {
                  console.log(this.state.paid_amount);
                  this.setState({
                    paid_amount:
                      parseInt(total_amount) -
                      parseInt(total_amount) * parseFloat(itemValue),
                    discount: itemValue,
                  });
                }}
              >
                <Picker.Item label="0%" value="0" />
                <Picker.Item label="3%" value="0.03" />
                <Picker.Item label="5%" value="0.05" />
                <Picker.Item label="7.5%" value="0.075" />
                <Picker.Item label="10%" value="0.1" />
                <Picker.Item label="12.5%" value="0.125" />
                <Picker.Item label="15%" value="0.15" />
              </Picker>
            </View>
          </View>
          <View style={{ marginTop: 35 }}>
            <Text
              style={{
                marginLeft: 15,
                fontSize: 17,
                color: "#949494",
                fontFamily: "Nunito",
              }}
            >
              Payment method:
            </Text>
            <View style={styles.pickerView}>
              <Picker
                selectedValue={this.state.paymentMethod}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({ paymentMethod: itemValue });
                }}
              >
                <Picker.Item label="Select method" value="" color="#949494" />
                <Picker.Item label="Cash" value="Cash" />
                <Picker.Item label="MoMo" value="MoMo" />
                <Picker.Item label="Bank" value="Bank" />
              </Picker>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.containerBtn}>
              <Button
                title="Cancel"
                titleStyle={{ fontFamily: "Nunito" }}
                containerStyle={{ flex: 1 }}
                buttonStyle={{ backgroundColor: "#FF0404" }}
              />
              <View style={{ flex: 1 }}></View>
              <Button
                title="Confirm"
                titleStyle={{ fontFamily: "Nunito" }}
                containerStyle={{ flex: 1 }}
                buttonStyle={{ backgroundColor: "#17A2B8" }}
                onPress={() => this.handleCheckout()}
              />
            </View>
          </View>
        </Card>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  pickerView: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#A8A8A8",
  },
  container: {
    marginTop: 40,
    marginBottom: 20,
    flex: 1,
  },
  containerBtn: {
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
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
