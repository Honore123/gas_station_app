import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { Card, Input, Icon, Button } from "react-native-elements";
import { connect } from "react-redux";
import { postExpense } from "../redux/ActionCreators";
import ValidationComponent from "react-native-form-validator";

const mapDispatchToProps = (dispatch) => ({
  postExpense: (expense) => dispatch(postExpense(expense)),
});

class NewExpenses extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      description: "",
      isLoading: false,
    };
  }

  handleExpense = () => {
    const { amount, description } = this.state;
    this.setState({ isLoading: true });
    this.validate({
      amount: { numbers: true, required: true },
      description: { required: true },
    });
    if (!this.isFormValid()) {
      Alert.alert("Error!", "Please fill all fields", [
        {
          text: "OK",
          onPress: () => this.setState({ isLoading: false }),
        },
      ]);
    } else {
      this.props
        .postExpense({
          amount,
          description,
        })
        .then(() => {
          this.setState({ isLoading: false });
          this.props.navigation.navigate("Expenses");
        });
    }
  };

  render() {
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
              <Text>Loading</Text>
            </View>
          </View>
        </Modal>
        <Card>
          <Input
            placeholder="Amount"
            keyboardType="number-pad"
            value={this.state.amount}
            onChangeText={(amount) => this.setState({ amount })}
            rightIcon={{
              type: "feather",
              name: "dollar-sign",
              color: "#fff",
              backgroundColor: "#17A2B8",
              style: { padding: 10 },
            }}
          />
          <Input
            placeholder="Activity"
            value={this.state.description}
            onChangeText={(description) => this.setState({ description })}
          />
          <View style={styles.container}>
            <View style={styles.containerBtn}>
              <Button
                title="Cancel"
                containerStyle={{ flex: 1 }}
                buttonStyle={{ backgroundColor: "#FF0404" }}
                onPress={() => this.props.navigation.navigate("Expenses")}
              />
              <View style={{ flex: 1 }}></View>
              <Button
                title="Add"
                containerStyle={{ flex: 1 }}
                buttonStyle={{ backgroundColor: "#17A2B8" }}
                onPress={() => this.handleExpense()}
              />
            </View>
          </View>
        </Card>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
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
export default connect(null, mapDispatchToProps)(NewExpenses);
