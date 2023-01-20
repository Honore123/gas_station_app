import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Modal,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerContent,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import {
  fetchCategories,
  fetchMaterials,
  fetchVendors,
  fetchProducts,
  logoutUser,
  fetchExpenses,
} from "../redux/ActionCreators";
import Products from "./ProductsComponent";
import NewProduct from "./NewProductComponent";
import Dashboard from "./DashboardComponent";
import Sales from "./SalesComponent";
import Cart from "./CartComponent";
import AddProduct from "./AddProductComponent";
import Checkout from "./CheckoutComponent";
import Login from "./LoginComponent";
import ScanBarCode from "./ScanBarCodeComponent";
import Expenses from "./ExpensesComponent";
import NewExpenses from "./NewExpensesComponent";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchMaterials: () => dispatch(fetchMaterials()),
  fetchVendors: () => dispatch(fetchVendors()),
  fetchProducts: () => dispatch(fetchProducts()),
  fetchExpenses: () => dispatch(fetchExpenses()),
  logoutUser: (token) => dispatch(logoutUser(token)),
});

const dashboard = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerStyle: { backgroundColor: "#17A2B8" },
          headerTitleStyle: {
            alignSelf: "center",
            color: "#FFFFFF",
            fontFamily: "Quicksand-Medium",
          },
          headerLeft: () => (
            <Icon
              name="menuunfold"
              type="ant-design"
              size={26}
              iconStyle={{ color: "#FFFFFF", marginLeft: 10 }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
          headerRight: () => (
            <Icon
              name="setting"
              type="ant-design"
              size={26}
              iconStyle={{ color: "#FFFFFF", marginRight: 10 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const sales = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sales List"
        component={Sales}
        options={{
          headerStyle: { backgroundColor: "#17A2B8" },
          headerTitleStyle: {
            alignSelf: "center",
            color: "#FFFFFF",
            fontFamily: "Quicksand-Medium",
          },
          headerLeft: () => (
            <Icon
              name="menuunfold"
              type="ant-design"
              size={26}
              iconStyle={{ color: "#FFFFFF", marginLeft: 10 }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
          headerRight: () => (
            <Icon
              name="setting"
              type="ant-design"
              size={26}
              iconStyle={{ color: "#FFFFFF", marginRight: 10 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Cart List"
        component={Cart}
        options={{
          headerStyle: { backgroundColor: "#17A2B8" },
          headerTitleStyle: {
            alignSelf: "center",
            color: "#FFFFFF",
            fontFamily: "Quicksand-Medium",
          },
          headerLeft: () => (
            <Icon
              name="arrowleft"
              type="ant-design"
              size={26}
              iconStyle={{ color: "#FFFFFF", marginLeft: 10 }}
              onPress={() => navigation.navigate("Sales List")}
            />
          ),
          headerRight: () => (
            <Icon
              name="setting"
              type="ant-design"
              size={26}
              iconStyle={{ color: "#FFFFFF", marginRight: 10 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Add Product"
        component={AddProduct}
        options={{
          headerStyle: { backgroundColor: "#17A2B8" },
          headerTitleStyle: {
            alignSelf: "center",
            color: "#FFFFFF",
            fontFamily: "Quicksand-Medium",
          },
          headerLeft: () => (
            <Icon
              name="arrowleft"
              type="ant-design"
              size={26}
              iconStyle={{ color: "#FFFFFF", marginLeft: 10 }}
              onPress={() => navigation.navigate("Cart List")}
            />
          ),
          headerRight: () => (
            <Icon
              name="setting"
              type="ant-design"
              size={26}
              iconStyle={{ color: "#FFFFFF", marginRight: 10 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Scan Barcode"
        component={ScanBarCode}
        options={{
          headerStyle: { backgroundColor: "#17A2B8" },
          headerTitleStyle: {
            alignSelf: "center",
            color: "#FFFFFF",
            fontFamily: "Quicksand-Medium",
          },
          headerLeft: () => (
            <Icon
              name="arrowleft"
              type="ant-design"
              size={26}
              iconStyle={{ color: "#FFFFFF", marginLeft: 10 }}
              onPress={() => navigation.navigate("Add Product")}
            />
          ),
          headerRight: () => (
            <Icon
              name="setting"
              type="ant-design"
              size={26}
              iconStyle={{ color: "#FFFFFF", marginRight: 10 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{
          headerStyle: { backgroundColor: "#17A2B8" },
          headerTitleStyle: {
            alignSelf: "center",
            color: "#FFFFFF",
            fontFamily: "Quicksand-Medium",
          },
          headerLeft: () => (
            <Icon
              name="arrowleft"
              type="ant-design"
              size={26}
              iconStyle={{ color: "#FFFFFF", marginLeft: 10 }}
              onPress={() => navigation.navigate("Cart List")}
            />
          ),
          headerRight: () => (
            <Icon
              name="setting"
              type="ant-design"
              size={26}
              iconStyle={{ color: "#FFFFFF", marginRight: 10 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const products = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={Products}
        options={{
          headerStyle: { backgroundColor: "#17A2B8" },
          headerTitleStyle: {
            alignSelf: "center",
            color: "#FFFFFF",
            fontFamily: "Quicksand-Medium",
          },
          headerLeft: () => (
            <Icon
              name="menuunfold"
              type="ant-design"
              size={26}
              iconStyle={{ color: "#FFFFFF", marginLeft: 10 }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
          headerRight: () => (
            <Icon
              name="plussquareo"
              type="ant-design"
              size={26}
              iconStyle={{ color: "#FFFFFF", marginRight: 10 }}
              onPress={() => navigation.navigate("New Product")}
            />
          ),
        }}
      />
      <Stack.Screen
        name="New Product"
        component={NewProduct}
        options={({ navigation }) => ({
          headerStyle: { backgroundColor: "#17A2B8" },
          headerTitleStyle: {
            alignSelf: "center",
            color: "#FFFFFF",
            fontFamily: "Quicksand-Medium",
          },
          headerLeft: () => (
            <Icon
              name="menuunfold"
              type="ant-design"
              size={26}
              iconStyle={{ color: "#FFFFFF", marginLeft: 10 }}
            />
          ),
          headerLeft: () => (
            <Icon
              name="arrowleft"
              type="ant-design"
              size={26}
              iconStyle={{ color: "#FFFFFF", marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const expenses = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Expenses"
        component={Expenses}
        options={{
          headerStyle: { backgroundColor: "#17A2B8" },
          headerTitleStyle: {
            alignSelf: "center",
            color: "#FFFFFF",
            fontFamily: "Quicksand-Medium",
          },
          headerLeft: () => (
            <Icon
              name="menuunfold"
              type="ant-design"
              size={26}
              iconStyle={{ color: "#FFFFFF", marginLeft: 10 }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
          headerRight: () => (
            <Icon
              name="setting"
              type="ant-design"
              size={26}
              iconStyle={{ color: "#FFFFFF", marginRight: 10 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="New Expense"
        component={NewExpenses}
        options={{
          headerStyle: { backgroundColor: "#17A2B8" },
          headerTitleStyle: {
            alignSelf: "center",
            color: "#FFFFFF",
            fontFamily: "Quicksand-Medium",
          },
          headerLeft: () => (
            <Icon
              name="menuunfold"
              type="ant-design"
              size={26}
              iconStyle={{ color: "#FFFFFF", marginLeft: 10 }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
          headerRight: () => (
            <Icon
              name="setting"
              type="ant-design"
              size={26}
              iconStyle={{ color: "#FFFFFF", marginRight: 10 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerHeader = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Modal animationType="fade" transparent={true} visible={props.isLoading}>
        <TouchableWithoutFeedback>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator size="large" color="#181461" />
            <Text style={{ fontFamily: "Quicksand-Regular" }}>Logging out</Text>
          </View>
        </View>
      </Modal>
      <SafeAreaView style={styles.container}>
        <View style={styles.drawerContent}>
          <View style={{ flex: 2 }}>
            <Image
              source={require("./images/avatar.png")}
              style={styles.drawerImage}
            />
          </View>
          <View style={{ flex: 3 }}>
            <Text style={styles.drawerHeaderText}>Seller</Text>
            <Text style={styles.drawerNameText}>{props.user.name}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Icon
              name="menufold"
              type="ant-design"
              size={24}
              iconStyle={{ color: "#FFFFFF" }}
              onPress={() => {
                props.navigation.toggleDrawer();
              }}
            />
          </View>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          onPress={props.logout}
          icon={({ color }) => (
            <Icon type="ant-design" name="logout" size={24} color={color} />
          )}
          labelStyle={{ fontFamily: "Quicksand-Medium" }}
          style={{ borderTopWidth: 1, borderTopColor: "#D9D9D9" }}
        />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  componentDidMount() {
    const { token } = this.props.auth;

    this.props.fetchCategories();
    this.props.fetchMaterials();
    this.props.fetchVendors();
    this.props.fetchProducts();
    this.props.fetchExpenses();
  }
  handleLogout() {
    const { token } = this.props.auth;
    this.setState({ isLoading: true });
    this.props.logoutUser(token).then(() => {
      this.setState({ isLoading: false });
    });
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    if (isAuthenticated) {
      return (
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Dashboard"
            drawerContentOptions={{
              activeTintColor: "#17A2B8",
              labelStyle: { fontFamily: "Quicksand-Medium" },
            }}
            drawerContent={(props) => (
              <DrawerHeader
                {...props}
                logout={this.handleLogout.bind(this)}
                user={user}
                isLoading={this.state.isLoading}
              />
            )}
          >
            <Drawer.Screen
              name="Dashboard"
              component={dashboard}
              options={{
                drawerIcon: ({ color }) => (
                  <Icon
                    type="ant-design"
                    name="dashboard"
                    size={24}
                    color={color}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Sales"
              component={sales}
              options={{
                drawerIcon: ({ color }) => (
                  <Icon
                    type="font-awesome"
                    name="money"
                    size={24}
                    color={color}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Inventory"
              component={products}
              options={{
                drawerIcon: ({ color }) => (
                  <Icon type="entypo" name="shop" size={24} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="Expenses"
              component={expenses}
              options={{
                drawerIcon: ({ color }) => (
                  <Icon type="entypo" name="export" size={24} color={color} />
                ),
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      );
    } else {
      return <Login />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContent: {
    backgroundColor: "#17A2B8",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "Quicksand-SemiBold",
  },
  drawerNameText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Quicksand-Medium",
  },
  drawerImage: {
    margin: 10,
    width: 68,
    height: 68,
    borderRadius: 50,
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
export default connect(mapStateToProps, mapDispatchToProps)(Main);
