/** @format */

import React from "react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";
import SvgUri from "react-native-svg-uri-updated";
import Editcatelogue from "./Editcatelogue";

const AllTiersCard = (props) => {
  console.log(props, "props");
  const id = props._id;
  return (
    <View
      style={[
        GlobalStyles.catalogueCol,
        GlobalStyles.flexRow,
        GlobalStyles.justifyBetween,
        GlobalStyles.whiteBg,
      ]}>
      <View style={[GlobalStyles.catalogueLeft, GlobalStyles.flexRow]}>
        <View>
          <Text
            style={[
              GlobalStyles.font12,
              GlobalStyles.textBlack,
              GlobalStyles.fontSemi,
              GlobalStyles.mb7,
            ]}>
            {props.tierName}
          </Text>

          <Text
            style={[
              GlobalStyles.font10,
              GlobalStyles.textBlack,
              GlobalStyles.mb7,
            ]}>
            Amount Type: {props.amountType}
          </Text>
          <Text
            style={[
              GlobalStyles.font10,
              GlobalStyles.textBlack,
              GlobalStyles.mb7,
            ]}>
            Value : {props.value}
          </Text>
        </View>
      </View>
      <View
        style={[
          GlobalStyles.cataloguergt,
          GlobalStyles.flexColumn,
          GlobalStyles.justifyBetween,
          GlobalStyles.alignEnd,
        ]}>
        {/* {in_stock == 0 ? (
                    <View style={[GlobalStyles.stockView, GlobalStyles.redBg]}>
                        <Text style={[GlobalStyles.font10, GlobalStyles.textWhite]}>Out Stock</Text>
                    </View>
                ) : (
                    <View style={GlobalStyles.stockView}>
                        <Text style={[GlobalStyles.font10, GlobalStyles.textWhite]}>In stock</Text>
                    </View>
                )} */}

        <View
          style={[
            GlobalStyles.flexRow,
            GlobalStyles.alignCenter,
            GlobalStyles.padR6,
          ]}>
          <TouchableOpacity>
            <SvgUri
              source={require("../../../assets/images/dashboard/edit_icon.svg")}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity style={[GlobalStyles.marlft13]}>
                        <SvgUri source={require('../../../assets/images/dashboard/trash_icon.svg')} />
                    </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

export default AllTiersCard;
