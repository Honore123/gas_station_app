import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";
import { fetchSales } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    sales: state.sales,
    auth: state.auth,
    expenses: state.expenses,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchSales: (token) => dispatch(fetchSales(token)),
});

class Dashboard extends Component {
  componentDidMount() {
    const { token } = this.props.auth;
    this.props.fetchSales(token);
  }
  sum = (key) => {
    return this.props.sales.sales.reduce(
      (a, b) => a + (parseInt(b[key]) || 0),
      0
    );
  };
  sumBank = (key) => {
    const banks = this.props.sales.sales.filter(
      (sale) => sale.payment_method == "Bank"
    );
    return banks.reduce((a, b) => a + (parseInt(b[key]) || 0), 0);
  };
  sumCash = (key) => {
    const cashes = this.props.sales.sales.filter(
      (sale) => sale.payment_method == "Cash"
    );
    return cashes.reduce((a, b) => a + (parseInt(b[key]) || 0), 0);
  };
  sumMomo = (key) => {
    const momo = this.props.sales.sales.filter(
      (sale) => sale.payment_method == "MoMo"
    );
    return momo.reduce((a, b) => a + (parseInt(b[key]) || 0), 0);
  };
  sumExp = (key) => {
    return this.props.expenses.expenses.reduce(
      (a, b) => a + (parseInt(b[key]) || 0),
      0
    );
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.cardContent}>
          <Card containerStyle={styles.cardHolder}>
            <View style={styles.cardTextHolder}>
              <Text style={styles.todaySalesTitle}>Cash</Text>
              <Text style={styles.cardNumberText}>
                {this.sumCash("amount_paid")
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                Rwf
              </Text>
              <Text style={styles.todaySalesTitle}>MoMo</Text>
              <Text style={styles.cardNumberText}>
                {this.sumMomo("amount_paid")
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                Rwf
              </Text>
              <Text style={styles.todaySalesTitle}>Bank</Text>
              <Text style={styles.cardNumberText}>
                {this.sumBank("amount_paid")
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                Rwf
              </Text>
              <Text style={styles.todaySalesTitle}>Today's Sales</Text>
              <Text style={styles.cardNumberText}>
                {this.sum("amount_paid")
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                Rwf
              </Text>
              <Button
                title="New Sale"
                type="outline"
                onPress={() => this.props.navigation.navigate("Sales")}
                titleStyle={styles.cardNavigateBtnTitle}
                containerStyle={styles.cardNavigateBtnContainer}
              />
            </View>
          </Card>
          <Card containerStyle={styles.cardHolder}>
            <View style={styles.cardTextHolder}>
              <Text style={styles.todaySalesTitle}>Expenses</Text>
              <Text style={styles.cardNumberText}>
                {this.sumExp("amount")
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                Rwf{" "}
              </Text>
              <Button
                title="Expenses"
                type="outline"
                onPress={() => this.props.navigation.navigate("Expenses")}
                titleStyle={styles.cardNavigateBtnTitle}
                containerStyle={styles.cardNavigateBtnContainer}
              />
            </View>
          </Card>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContent: {
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
  },
  cardHolder: {
    borderRadius: 7,
    borderWidth: 0,
    elevation: 3,
    marginBottom: 10,
  },
  cardTextHolder: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 20,
  },
  todaySalesTitle: {
    flex: 1,
    paddingTop: 5,
    marginBottom: 10,
    color: "#949494",
    fontSize: 18,
    fontFamily: "Nunito",
  },
  cardNumberText: {
    marginBottom: 10,
    fontSize: 20,
    paddingTop: 5,
    flex: 1,
    fontFamily: "Nunito",
  },
  cardNavigateBtnTitle: {
    fontSize: 17,
    fontFamily: "Nunito",
    color: "#17A2B8",
    textTransform: "uppercase",
  },
  cardNavigateBtnContainer: {
    paddingTop: 5,
    flex: 1,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
