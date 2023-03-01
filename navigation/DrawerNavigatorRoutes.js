/** @format */

import React from "react";
import { Image, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DashboardScreen from "../src/screens/DashboardScreen";
import SupplierProfile from "../src/screens/login/SupplierProfile";
import DashboardContentScreen from "../src/screens/DashboardContentScreen";
import CustomSidebarMenu from "./CustomSidebarMenu";
import NavigationDrawerHeader from "./NavigationDrawerHeader";
import { COLORS } from "../src/constant/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import DetailedOrderPage from "../src/screens/myOrders/DetailedAllOrders";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DashboardScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='{DashboardScreen'>
      <Stack.Screen
        name='DashboardScreen'
        component={DashboardScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='DetailedOrderPage'
        component={DetailedOrderPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: COLORS.white,
        drawerActiveTintColor: COLORS.loginTextInput,
        drawerStyle: {
          width: 350,
        },
        labelStyle: {
          color: COLORS.loginTextInput,
        },
        itemStyle: { marginVertical: 5, color: "white" },
      }}
      drawerContent={CustomSidebarMenu}>
      <Drawer.Screen
        name='DashboardScreenStack'
        options={{ drawerItemStyle: { height: 0 } }}
        component={DashboardScreenStack}
      />
      <Drawer.Screen
        name='SupplierProfile'
        options={{ drawerItemStyle: { height: 0 } }}
        component={SupplierProfile}
      />
    </Drawer.Navigator>
  );
};
const styles = StyleSheet.create({
  icon: {
    alignSelf: "center",
    marginLeft: 30,
    marginRight: -20,
  },
});
export default DrawerNavigatorRoutes;
