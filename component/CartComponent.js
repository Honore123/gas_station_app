import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { ListItem, Button, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { removeCart } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    carts: state.carts,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeCart: (product) => dispatch(removeCart(product)),
});

class Cart extends Component {
  sum = (key) => {
    return this.props.carts.carts.reduce((a, b) => a + (b[key] || 0), 0);
  };

  handleRemoveCart = (product) => {
    this.props.removeCart(product);
  };
  render() {
    const { carts } = this.props.carts;
    return (
      <View style={{ height: "100%" }}>
        <ScrollView>
          {carts[0] ? (
            carts.map((cart, index) => (
              <ListItem key={index} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title style={styles.listTitle}>
                    {cart.product_name}
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.listSubTitle}>
                    Qty: {cart.quantity} Pcs
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={styles.listSubTitle}>
                    Total:{" "}
                    {cart.total_price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    Rwf
                  </ListItem.Subtitle>
                </ListItem.Content>
                <Button
                  type="clear"
                  buttonStyle={styles.listBtn}
                  icon={() => (
                    <Icon
                      name="delete"
                      type="ant-design"
                      size={25}
                      color="#FF0404"
                    />
                  )}
                  onPress={() => this.handleRemoveCart(cart.product_id)}
                />
              </ListItem>
            ))
          ) : (
            <View style={{ alignItems: "center", marginTop: "50%", flex: 1 }}>
              <Icon
                name="shoppingcart"
                type="ant-design"
                size={30}
                color="#9D9EA0"
              />
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 17,
                  fontFamily: "Quicksand-Medium",
                  color: "#9D9EA0",
                }}
              >
                Empty Cart
              </Text>
            </View>
          )}
        </ScrollView>
        <ListItem style={styles.floatView}>
          <ListItem.Content>
            <ListItem.Title style={styles.floatListItemTitle}>
              Total:{" "}
              {carts[0]
                ? this.sum("total_price")
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : 0}
              Rwf
            </ListItem.Title>
            {carts[0] ? (
              <Button
                title="Checkout"
                titleStyle={{ fontFamily: "Nunito" }}
                buttonStyle={styles.floatListItemBtn}
                onPress={() =>
                  this.props.navigation.navigate("Checkout", {
                    total_amount: this.sum("total_price"),
                  })
                }
              />
            ) : (
              <Button
                title="Checkout"
                titleStyle={{ fontFamily: "Nunito" }}
                buttonStyle={styles.floatListItemBtn}
                disabled
              />
            )}
          </ListItem.Content>
          <Button
            buttonStyle={styles.floatBtn}
            icon={() => (
              <Icon name="plus" type="ant-design" size={30} color="#FFFFFF" />
            )}
            onPress={() =>
              this.props.navigation.navigate("Add Product", { barcode: "00" })
            }
          />
        </ListItem>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  listTitle: {
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "Quicksand-Medium",
  },
  listSubTitle: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: "Quicksand-Medium",
  },
  listBtn: {
    borderRadius: 0,
    paddingHorizontal: 10,
  },
  floatView: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatListItemTitle: {
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "Quicksand-Medium",
  },
  floatListItemBtn: {
    paddingHorizontal: 30,
    backgroundColor: "#17A2B8",
  },
  floatBtn: {
    borderRadius: 50,
    backgroundColor: "#17A2B8",
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
