import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Card, Button, Icon, SearchBar } from "react-native-elements";
import { connect } from "react-redux";
import { imageUrl } from "../shared/baseUrl";

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }
  render() {
    const { products } = this.props.products;
    return (
      <ScrollView style={styles.container}>
        <SearchBar
          placeholder="Search product"
          onChangeText={(search) => this.setState({ search })}
          value={this.state.search}
          lightTheme={true}
          containerStyle={{
            backgroundColor: "#17A2B8",
            borderTopWidth: 0,
            borderBottomWidth: 0,
          }}
          inputContainerStyle={{
            backgroundColor: "#fff",
          }}
          inputStyle={{
            color: "#000",
            fontFamily: "Nunito",
          }}
        />
        <View style={styles.cardContent}>
          {this.state.search
            ? products.map((product) =>
                product.product_name
                  .toLowerCase()
                  .includes(this.state.search) ? (
                  <View key={product.id} style={{ flex: 1 }}>
                    <Card
                      containerStyle={{
                        borderRadius: 10,
                        borderWidth: 0,
                        elevation: 5,
                      }}
                    >
                      <Card.Image
                        source={{
                          uri: imageUrl + JSON.parse(product.images)[0],
                        }}
                      ></Card.Image>
                      <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text
                          style={{
                            flex: 1,
                            marginTop: 20,
                            paddingTop: 5,
                            marginBottom: 10,
                            color: "#353C51",
                            fontSize: 17,
                          }}
                        >
                          {product.product_name}
                        </Text>
                        <Text
                          style={{
                            marginTop: 20,
                            fontSize: 17,
                            paddingTop: 5,
                            textAlign: "center",
                            color: "#fff",
                            backgroundColor: "#17A2B8",
                            flex: 1,
                          }}
                        >
                          {parseInt(product.retail_price).toLocaleString(
                            undefined,
                            {
                              maximumFractionDigits: 2,
                            }
                          )}{" "}
                          Rwf
                        </Text>
                      </View>
                    </Card>
                  </View>
                ) : null
              )
            : products.map((product) => (
                <View key={product.id} style={{ flex: 1 }}>
                  <Card
                    containerStyle={{
                      borderRadius: 10,
                      borderWidth: 0,
                      elevation: 5,
                    }}
                  >
                    <Card.Image
                      source={{ uri: imageUrl + JSON.parse(product.images)[0] }}
                    ></Card.Image>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <Text
                        style={{
                          flex: 1,
                          marginTop: 20,
                          paddingTop: 5,
                          marginBottom: 10,
                          color: "#353C51",
                          fontSize: 17,
                          fontFamily: "Nunito",
                        }}
                      >
                        {product.product_name}
                      </Text>
                      <Text
                        style={{
                          marginTop: 20,
                          fontSize: 17,
                          fontFamily: "Nunito",
                          paddingTop: 5,
                          textAlign: "center",
                          color: "#fff",
                          backgroundColor: "#17A2B8",
                          flex: 1,
                        }}
                      >
                        {parseInt(product.retail_price)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        Rwf
                      </Text>
                    </View>
                  </Card>
                </View>
              ))}
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
    marginBottom: 20,
  },
});

export default connect(mapStateToProps)(Products);
