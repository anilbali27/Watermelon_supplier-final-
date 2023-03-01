/** @format */

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  Alert,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Pressable,
  FlatList,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Searchbar } from "react-native-paper";
// import { useFocusEffect } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import Animated from "react-native-reanimated";
// import BottomSheet from "reanimated-bottom-sheet";

import { COLORS } from "../../constant/Colors";
import { FONTS } from "../../constant/Font";
import GlobalStyles from "../../../assets/css/styles";
import MenuIcon from "../../../assets/images/icons/MenuIcon";
import AllOrdersCard from "./AllOrdersCard";
import PendingAcceptanceCard from "./PendingAcceptanceCard";
import Bell from "../../../assets/images/icons/Bell";
import { endPoint } from "../Services/API/ApiConstants";
import api from "../Services/API/CallingApi";
import SettingIcon from "../../../assets/images/icons/Setting";
import SearchIcon from "../../../assets/images/icons/Search";
import CrossMark from "../../../assets/images/icons/CrossMark";
import DropDown from "../../../assets/images/icons/DropDown";
import UpArrow from "../../../assets/images/UpArrow";
import ArrowRight from "../../../assets/images/icons/ArrowRight";

const MyorderScreen = ({ navigation }) => {
  const refRBSheet = useRef();
  const height = React.useRef(null);

  const [allOrders, setAllOrders] = useState(true);
  const [pendingAcceptance, setPendingAcceptance] = useState(false);
  const [list, setList] = useState([]);

  const [filterdData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setSearch] = useState("");
  const [myList, setMyList] = useState();
  const [suppliers, setSuppliers] = useState(false);
  const [outlets, setOutlets] = useState(false);
  const [status, setStatus] = useState(false);

  const [sheetHeight, setSheetHeight] = useState(500);

  const bottomSheetModalRef = useRef(null);

  // const snapPoints = useMemo(() => ["25%", "50%"], []);
  const snapPoints = ["48%", "80%"];

  const handlePresentModal = () => {
    bottomSheetModalRef.current.open();
  };

  const [isVisible, setIsVisible] = useState(false);

  //call back
  const handleSheetChange = useCallback((index) => {
    console.log(index);
  }, []);

  /*filter supplier names*/
  const names = [
    "Al1",
    "Global Beverages",
    "FResh Bulk",
    "Chief Middle East(CME)",
    "MH Enterpries",
    "HK Enteprisers(Dry)",
    "Royal Techno Foodstuff LLC",
    "Bryght Supplies",
    "Premium First Choice Foods",
  ];

  const nameList = names.map((name, index) => (
    <View>
      <TouchableOpacity>
        <Text key={index} style={GlobalStyles.textBackground}>
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  ));

  /*pignation*/
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const Loader = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size='large' />
    </View>
  );

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {}, [sheetHeight]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     window.location.reload();
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     loadData();
  //     handleSubmit();
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      //Below alert will fire every time when profile screen is focused
      setAllOrders(true);
      setPendingAcceptance(false);

      // alert("Hi from profile");
    }, [])
  );

  // useFocusEffect(() => {
  //   window.location.reload();
  // });

  const handleSubmit = async (data) => {
    // let token =
    //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhZ2luZ2FwaS53YXRlcm1lbG9uLm1hcmtldFwvaW5kZXgucGhwXC9hcGlcL3YxXC9sb2dpbiIsImlhdCI6MTY3NjEwMzQxMiwiZXhwIjoxNzA3NjM5NDEyLCJuYmYiOjE2NzYxMDM0MTIsImp0aSI6IkpDQW9mT3Job09EdjdYYmciLCJzdWIiOiI2MWE0ODY5YTM5NTkwZTJlZmM0NjM0MjUiLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.CG4SnXNK37yvz7JA2wr57VGwDfLjYLBfSyL0g9lYM8E";

    const jsonValue = await AsyncStorage.getItem("UserToken");
    console.log(jsonValue, "ttttttttttttttttttttttt");
    let token = jsonValue;

    const result = await api.CreateMasterData(endPoint.Order_List, token);
    // const List = await result;

    // const {
    //   data: { orders },
    // } = response;

    // console.log(orders, "...................resultttttt");

    setMyList(result);
    setList(result.data?.orders);
    setfilterData(result.data?.orders);
    setmasterData(result.data?.orders);
  };

  // const getProducts = async () => {
  //   const jsonValue = await AsyncStorage.getItem("UserToken");
  //   let token = jsonValue;
  //   var myJson = {
  //     user_type_id: "5fe9c03ab70cb405ba5dcb33",
  //   };
  //   const result = await api.getProduct(token, endPoint.get_products, myJson);
  //   console.log(result.data, "090909878");

  //   if (result) {
  //     setmyproducts(result);
  //     setProductsdata(result.data);
  //     setfilterdData(result.data);
  //   } else {
  //     setProductsdata([]);
  //   }
  // };

  const fetchData = async () => {
    setPage(page + 1);
    const response = await fetch(`https://your-api.com/data?page=${page + 1}`);
    const newData = await response.json();
    setData([...data, ...newData]);
  };

  const title = list?.supplier_info?.supplier_name;

  // console.log(list.data, "66666");

  const onPressofOrders = () => {
    setPendingAcceptance(false);
    setAllOrders(true);
  };

  const onPressofAcceptance = () => {
    setAllOrders(false);
    setPendingAcceptance(true);
  };

  //search function
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.supplier_info?.supplier_name
          ? item.supplier_info?.supplier_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterData(newData);
      setSearch(text);
    } else {
      setfilterData(masterData);
      setSearch(text);
    }
  };

  /*filter*/

  // const onTextLayout = (event) => {
  //   const { height } = event.nativeEvent.layout;
  //   setSheetHeight(height);
  // };

  //TO Give padding between the flatlist
  const ItemSepartorView = () => {
    return <View style={{ height: 0, width: "100%" }} />;
  };

  return (
    <BottomSheetModalProvider>
      <View style={GlobalStyles.orderContainer}>
        <View style={GlobalStyles.headerContainer}>
          <View style={GlobalStyles.headerAligment}>
            <View style={[GlobalStyles.headerDirection]}>
              <View style={GlobalStyles.changeFlexDirection}>
                <View style={{ justifyContent: "center" }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.toggleDrawer();
                    }}>
                    <MenuIcon />
                  </TouchableOpacity>

                  {/* <Pressable onPress={() => {}}>
                  <MenuIcon />
                </Pressable> */}
                </View>
                <Text style={GlobalStyles.menuText}>My Orders</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("NotificationScreen")}>
                <View style={{ alignContent: "flex-end" }}>
                  <Bell />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={GlobalStyles.orderTabDirection}>
            <Pressable onPress={() => onPressofOrders()}>
              {allOrders ? (
                <View style={GlobalStyles.allOrderView}>
                  <Text style={GlobalStyles.allOrderOnpressText}>
                    ALL ORDERS
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={GlobalStyles.allOrderText}>ALL ORDERS</Text>
                </View>
              )}
            </Pressable>

            <View style={GlobalStyles.prendingAccecptance}>
              <Pressable onPress={() => onPressofAcceptance()}>
                {pendingAcceptance ? (
                  <View style={GlobalStyles.pendingAcceptanceOnpressView}>
                    <Text style={GlobalStyles.pendingOnPressText}>
                      PENDING ACCEPTANCE
                    </Text>
                  </View>
                ) : (
                  <View style={GlobalStyles.pendingAcceptanceView}>
                    <Text style={GlobalStyles.pendingText}>
                      PENDING ACCEPTANCE
                    </Text>
                  </View>
                )}
              </Pressable>
            </View>
          </View>
        </View>

        {allOrders ? (
          <View
            style={{
              width: "100%",
            }}>
            {/* <View
            style={{
              height: 38,
              width: "100%",
              paddingLeft: 19,
              paddingRight: 18,
              marginTop: 19,
            }}>
            <Searchbar
              inputStyle={GlobalStyles.searchInput}
              style={GlobalStyles.searchContainer}
              placeholderTextColor={"#0F141A"}
              placeholder='Search'
              value={search}
              onChangeText={(text) => searchFilterFunction(text)}
            />
          </View> */}

            <View style={GlobalStyles.searchBarPaddingView}>
              <View style={GlobalStyles.searchBarView}>
                <View style={GlobalStyles.searchIconView}>
                  <SearchIcon />
                  <View style={GlobalStyles.searchPlaceHolderView}>
                    <TextInput
                      onChangeText={(text) => searchFilterFunction(text)}
                      value={search}
                      placeholder='Search'
                      placeholderTextColor={COLORS.introText}
                    />
                  </View>
                </View>
                <View>
                  <Pressable
                    onPress={() => {
                      refRBSheet.current.open();
                    }}>
                    <View style={GlobalStyles.searchfilterView}>
                      <SettingIcon />
                    </View>
                  </Pressable>
                  {/* 
                  <TouchableOpacity onPress={handlePresentModal}>
                    <View style={GlobalStyles.searchfilterView}>
                      <SettingIcon />
                    </View>
                  </TouchableOpacity> */}
                </View>
              </View>
            </View>

            {/* <View
            style={{
              paddingLeft: 18,
              paddingRight: 19,
              paddingTop: 19,
              width: "100%",
              // backgroundColor: "red",
              marginBottom: 260,
            }}> */}
            <View style={GlobalStyles.promotoinsCardPaddingView}>
              {!myList ? (
                <View>
                  <ActivityIndicator color={COLORS.button} size='large' />
                </View>
              ) : (
                <FlatList
                  data={filterdData}
                  keyExtractor={(item) => item._id}
                  ItemSeparatorComponent={ItemSepartorView}
                  showsVerticalScrollIndicator={false}
                  onEndReached={handleSubmit}
                  onEndReachedThreshold={20}
                  renderItem={({ item }) => (
                    <Pressable
                      style={{ flex: 1 }}
                      onPress={() =>
                        navigation.navigate("DetailedOrderPage", {
                          id: item?._id,
                          status: item?.status,
                          orderNumber: item?.unique_name,
                          titleOne: item?.supplier_info?.supplier_name,
                          outlet: item?.outlet_info.name,
                          emailStatus: item?.status_name,
                          deliveryaddress: item?.delivery_address,
                          billingAddress: item.billing_address,
                          payments: item?.payments,
                          deliveryData: item.delivery_requested.delivery_date,
                          totalPayableAmount: item.total_payable_amount,
                          orderDateTime: item.Order_date_time,
                          estimatedSubtotal: item.total_cost_amount,
                          estimatedDeliveryFee: item.delivery_fee,
                          vatAmount: item.vat_amount,
                          moneyStatus: item?.paid_status,
                          items: item?.products_info.length,
                          productInfo: item?.products_info,
                          invoice: item?.invoice_status.invoice_link,
                        })
                      }>
                      <AllOrdersCard
                        title={item?.supplier_info?.supplier_name}
                        // title={title}
                        outlet={item?.outlet_info.name}
                        amount={item?.total_payable_amount}
                        timing={item?.Order_date_time}
                        // status={item?.paid_status_name}
                        moneyStatus={item?.paid_status}
                        emailStatus={item?.status_name}
                        image={item?.supplier_profile}
                        rating={item?.products_info[0]?.r_qty}
                      />
                    </Pressable>
                  )}
                  // onRefresh={handleRefresh}
                  // refreshing={isRefreshing}
                />
              )}
            </View>
          </View>
        ) : null}
        {pendingAcceptance ? (
          <View
            style={{
              width: "100%",
            }}>
            <View style={GlobalStyles.searchBarPaddingView}>
              <View style={GlobalStyles.searchBarView}>
                <View style={GlobalStyles.searchIconView}>
                  <SearchIcon />
                  <View style={GlobalStyles.searchPlaceHolderView}>
                    <TextInput
                      onChangeText={() => {}}
                      // value={number}
                      placeholder='Search'
                      placeholderTextColor={COLORS.introText}
                    />
                  </View>
                </View>
                <View>
                  <Pressable
                    onPress={() => {
                      console.log("pressed");
                    }}>
                    <View style={GlobalStyles.searchfilterView}>
                      <SettingIcon />
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={GlobalStyles.PendingAcceptanceCardPadding}>
              <PendingAcceptanceCard />
            </View>
          </View>
        ) : null}

        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          animationType={"none"}
          // height={sheetHeight}
          height={500}
          customStyles={{
            // wrapper: {
            //   backgroundColor: "transparent",
            // },
            draggableIcon: {
              backgroundColor: "#1F9CEF",
            },
          }}>
          {/* 
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          closeOnDragDown={true}
          closeOnPressMask={true}
          snapPoints={snapPoints}
          // onChange={handleSheetChange}
          // handleComponent={() => (
          //   <ScrollView style={{ backgroundColor: "white", height: 10 }} />
          // )}
          // onLayout={() => {
          //   if (bottomSheetRef.current) {
          //     bottomSheetRef.current.expand();
          //   }
          // }}
        > */}
          <ScrollView>
            <View
              style={{
                justifyContent: "space-between",
              }}>
              <View>
                <View style={GlobalStyles.filterContainer}>
                  <View
                    style={[GlobalStyles.justifyBetween, GlobalStyles.flexRow]}>
                    <View>
                      <Text style={GlobalStyles.filterHeadingText}>
                        Sort & Filter
                      </Text>
                    </View>
                    <View>
                      <CrossMark />
                    </View>
                  </View>
                </View>
                <View style={GlobalStyles.HorizantalLine} />

                <View style={GlobalStyles.filterSubHeadingView}>
                  <Pressable
                    onPress={() => {
                      setSuppliers(!suppliers);
                      setSheetHeight(500);
                    }}>
                    <View
                      style={[
                        GlobalStyles.justifyBetween,
                        GlobalStyles.flexRow,
                      ]}>
                      <View>
                        <Text style={[GlobalStyles.filterSubHeadingText]}>
                          Suppliers
                        </Text>
                      </View>
                      <View>{suppliers ? <UpArrow /> : <DropDown />}</View>
                    </View>
                  </Pressable>
                  {suppliers ? (
                    <View
                      style={{
                        // backgroundColor: "red",
                        width: "100%",
                        paddingRight: 10,
                        paddingTop: 10,
                      }}>
                      <Text style={{ paddingRight: 10, paddingTop: 10 }}>
                        {nameList}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View style={GlobalStyles.HorizantalLine} />
                <View style={GlobalStyles.filterSubHeadingView}>
                  <Pressable
                    onPress={() => {
                      setOutlets(!outlets);
                      setSheetHeight(700);
                    }}>
                    <View
                      style={[
                        GlobalStyles.justifyBetween,
                        GlobalStyles.flexRow,
                      ]}>
                      <View>
                        <Text style={[GlobalStyles.filterSubHeadingText]}>
                          Outlets
                        </Text>
                      </View>
                      <View>{outlets ? <UpArrow /> : <DropDown />}</View>
                    </View>
                  </Pressable>
                  {outlets ? (
                    <View
                      style={{
                        // backgroundColor: "red",
                        width: "100%",
                        paddingRight: 10,
                        paddingTop: 10,
                      }}>
                      <Text style={{ paddingRight: 10, paddingTop: 10 }}>
                        {nameList}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View style={GlobalStyles.HorizantalLine} />
                <View style={GlobalStyles.filterSubHeadingView}>
                  <Pressable
                    onPress={() => {
                      setStatus(!status);
                    }}>
                    <View
                      style={[
                        GlobalStyles.justifyBetween,
                        GlobalStyles.flexRow,
                      ]}>
                      <View>
                        <Text style={[GlobalStyles.filterSubHeadingText]}>
                          Status
                        </Text>
                      </View>
                      <View>{status ? <UpArrow /> : <DropDown />}</View>
                    </View>
                  </Pressable>
                  {status ? (
                    <View
                      style={{
                        // backgroundColor: "red",
                        width: "100%",
                        paddingRight: 10,
                        paddingTop: 10,
                      }}>
                      <Text style={{ paddingRight: 10, paddingTop: 10 }}>
                        {nameList}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
              <View style={{ marginTop: 135 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "#EDF5FF",
                    paddingLeft: 20,
                    paddingRight: 20,
                    height: 92,
                    alignItems: "center",
                    // marginTop: 135,
                  }}>
                  <View
                    style={{
                      width: 161,
                      height: 47,

                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <Text>Clear All</Text>
                  </View>
                  <View
                    style={{
                      width: 161,
                      height: 47,
                      backgroundColor: "#1F9CEF",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      borderRadius: 10,
                    }}>
                    <View style={{ paddingRight: 5 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          lineHeight: 20,
                          fontWeight: "bold",
                          color: "white",
                        }}>
                        Show Results
                      </Text>
                    </View>
                    <ArrowRight />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </RBSheet>
        {/* </BottomSheetModal> */}
      </View>
    </BottomSheetModalProvider>
  );
};

export default MyorderScreen;
