import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { ListItem, Button, Icon } from "react-native-elements";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
  };
};

class Expenses extends Component {
  render() {
    const { expenses } = this.props.expenses;
    return (
      <View style={{ height: "100%" }}>
        <ScrollView>
          {expenses[0] ? (
            expenses.map((expense, index) => (
              <ListItem key={index} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title style={styles.listTitle}>
                    {expense.description}
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.listSubTitle}>
                    Total:{" "}
                    {expense.amount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    Rwf
                  </ListItem.Subtitle>
                </ListItem.Content>
                {/* <Button
                  title="Remove"
                  titleStyle={{ fontFamily: "Nunito" }}
                  buttonStyle={styles.listBtn}
                /> */}
              </ListItem>
            ))
          ) : (
            <View style={{ alignItems: "center", marginTop: "50%", flex: 1 }}>
              <Icon
                name="emoji-happy"
                type="entypo"
                size={30}
                color="#9D9EA0"
              />
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 17,
                  color: "#9D9EA0",
                  fontFamily: "Nunito",
                }}
              >
                No expenses
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
          onPress={() => this.props.navigation.navigate("New Expense")}
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
    textTransform: "capitalize",
  },
  listSubTitle: {
    fontSize: 18,
    fontFamily: "Nunito",
  },
  listBtn: {
    borderRadius: 0,
    paddingHorizontal: 20,
    backgroundColor: "#FF0404",
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
export default connect(mapStateToProps)(Expenses);
