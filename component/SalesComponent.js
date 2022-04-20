import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { ListItem, Button, Icon } from "react-native-elements";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    sales: state.sales,
  };
};

class Sales extends Component {
  render() {
    const { sales } = this.props.sales;
    return (
      <View style={{ height: "100%" }}>
        <ScrollView>
          {sales[0] ? (
            sales.map((sale, index) => (
              <ListItem key={index} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title style={styles.listTitle}>
                    {sale.order_id}
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.listSubTitle}>
                    Total:{" "}
                    {sale.total_amount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    Rwf
                  </ListItem.Subtitle>
                </ListItem.Content>
                {/* <Button
                  title="View"
                  titleStyle={{ fontFamily: "Nunito" }}
                  buttonStyle={styles.listBtn}
                /> */}
              </ListItem>
            ))
          ) : (
            <View style={{ alignItems: "center", marginTop: "50%", flex: 1 }}>
              <Icon name="emoji-sad" type="entypo" size={30} color="#9D9EA0" />
              <Text style={{ marginTop: 10, fontSize: 17, color: "#9D9EA0" }}>
                No sales yet!
              </Text>
            </View>
          )}
        </ScrollView>
        <Button
          containerStyle={styles.floatBtnContainer}
          buttonStyle={styles.floatBtn}
          icon={() => (
            <Icon name="plus" type="ant-design" size={30} color="#FFFFFF" />
          )}
          onPress={() => this.props.navigation.navigate("Cart List")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listTitle: {
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "Nunito",
  },
  listSubTitle: {
    fontSize: 18,
    fontFamily: "Nunito",
  },
  listBtn: {
    borderRadius: 0,
    paddingHorizontal: 20,
    backgroundColor: "#17A2B8",
  },
  floatBtnContainer: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
  },
  floatBtn: {
    borderRadius: 50,
    backgroundColor: "#17A2B8",
  },
});
export default connect(mapStateToProps)(Sales);
