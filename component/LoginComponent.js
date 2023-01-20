import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import { loginUser } from "../redux/ActionCreators";
import ValidationComponent from "react-native-form-validator";

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginUser: (creds) => dispatch(loginUser(creds)),
});

class Login extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleLogin = () => {
    const { email, password } = this.state;
    this.validate({
      email: { email: true, required: true },
      password: { required: true },
    });
    if (!this.isFormValid()) {
      Alert.alert("Error!", "Please fill all fields", [
        {
          text: "OK",
          onPress: () => console.log("clicked ok"),
        },
      ]);
    } else {
      this.props.loginUser({
        email,
        password,
      });
    }
  };
  render() {
    const { isLoading } = this.props.auth;
    return (
      <View style={styles.container}>
        <View style={styles.logoImage}>
          <Image source={require("./images/logo.png")} />
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>LOGIN</Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Email"
            textContentType="emailAddress"
            inputContainerStyle={{
              borderStyle: "solid",
              borderColor: "#ced4da",
              borderWidth: 1,
              borderRadius: 15,
              paddingLeft: 20,
              height: 70,
            }}
            inputStyle={{
              fontFamily: "Quicksand-Regular",
              fontSize: 13,
            }}
            value={this.state.value}
            onChangeText={(email) => this.setState({ email })}
          />
          <Input
            placeholder="Password"
            textContentType="password"
            inputContainerStyle={{
              borderStyle: "solid",
              borderColor: "#ced4da",
              borderWidth: 1,
              borderRadius: 15,
              paddingLeft: 20,
              height: 70,
            }}
            inputStyle={{
              fontFamily: "Quicksand-Regular",
              fontSize: 13,
            }}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
          {isLoading ? (
            <Button
              title="Login"
              containerStyle={styles.loginBtnContainer}
              buttonStyle={styles.loginBtn}
              loading
            />
          ) : (
            <Button
              title="Login"
              containerStyle={styles.loginBtnContainer}
              buttonStyle={styles.loginBtn}
              titleStyle={{ fontSize: 17, fontFamily: "Quicksand-Medium" }}
              onPress={() => this.handleLogin()}
            />
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    marginTop: 20,
    paddingBottom: 70,
    backgroundColor: "#FFFFFF",
  },
  logoImage: {
    alignItems: "center",
    marginBottom: 80,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 70,
  },
  headerTitle: {
    fontSize: 30,
    fontFamily: "Quicksand-Bold",
  },
  inputContainer: {
    marginHorizontal: 20,
  },
  loginBtnContainer: {
    marginTop: 30,
  },
  loginBtn: {
    borderRadius: 15,
    height: 70,
    backgroundColor: "#17A2B8",
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
