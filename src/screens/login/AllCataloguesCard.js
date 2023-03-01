/** @format */

import React from "react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";

import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";
import SvgUri from "react-native-svg-uri-updated";
import Editcatelogue from "./Editcatelogue";

const AllCataloguesCard = (props) => {
  const date = moment(props.timing).format("MMM DD");
  const in_stock = props.in_stock;
  console.log(props, "props");

  return (
    <View
      style={[
        GlobalStyles.catalogueCol,
        GlobalStyles.flexRow,
        GlobalStyles.justifyBetween,
        GlobalStyles.whiteBg,
      ]}>
      <View style={[GlobalStyles.catalogueLeft, GlobalStyles.flexRow]}>
        <Image
          style={[
            GlobalStyles.catalogueImg,
            GlobalStyles.resizeContain,
            GlobalStyles.mr8,
          ]}
          source={require("../../../assets/images/icons/MaskGroup.png")}
          //source={props.product_image}
        />
        <View>
          <Text
            style={[
              GlobalStyles.font12,
              GlobalStyles.textBlack,
              GlobalStyles.fontSemi,
              GlobalStyles.mb2,
            ]}>
            {props.category_name}
          </Text>
          <Text
            style={[
              GlobalStyles.font10,
              GlobalStyles.textDefault,
              GlobalStyles.mb7,
            ]}>
            Fruits(kg)
          </Text>
          <Text
            style={[
              GlobalStyles.font10,
              GlobalStyles.textBlack,
              GlobalStyles.mb7,
            ]}>
            Product Code : {props.product_code}
          </Text>
          <View style={[GlobalStyles.flexRow]}>
            <Text
              style={[
                GlobalStyles.font10,
                GlobalStyles.textBlack,
                GlobalStyles.mb7,
              ]}>
              Registration No :
            </Text>
            <Text
              style={[
                GlobalStyles.width50,
                GlobalStyles.pl4,
                GlobalStyles.font10,
                GlobalStyles.textBlack,
                GlobalStyles.mb7,
              ]}>
              {props.id}
            </Text>
          </View>
          <Text
            style={[
              GlobalStyles.font10,
              GlobalStyles.textBlack,
              GlobalStyles.mb7,
            ]}>
            Sub Category : {props.subcategory_name}
          </Text>
          <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
            <SvgUri
              source={require("../../../assets/images/dashboard/green_tick_icon.svg")}
            />
            <Text
              style={[
                GlobalStyles.font10,
                GlobalStyles.textGreen,
                GlobalStyles.pl2,
              ]}>
              Market Place Availability
            </Text>
          </View>
        </View>
      </View>
      <View
        style={[
          GlobalStyles.cataloguergt,
          GlobalStyles.flexColumn,
          GlobalStyles.justifyBetween,
          GlobalStyles.alignEnd,
        ]}>
        {in_stock == 0 ? (
          <View style={[GlobalStyles.stockView, GlobalStyles.redBg]}>
            <Text style={[GlobalStyles.font10, GlobalStyles.textWhite]}>
              Out Stock
            </Text>
          </View>
        ) : (
          <View style={GlobalStyles.stockView}>
            <Text style={[GlobalStyles.font10, GlobalStyles.textWhite]}>
              In stock
            </Text>
          </View>
        )}

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

export default AllCataloguesCard;
