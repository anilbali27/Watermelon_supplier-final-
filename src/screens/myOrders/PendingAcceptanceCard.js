/** @format */

import React from "react-native";
import { View, Text, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";

const PendingAcceptanceCard = () => {
  return (
    <View style={GlobalStyles.allOrderCardcardView}>
      <View style={GlobalStyles.allOrderCardInnerDimension}>
        <View style={{ width: "100%" }}>
          <View
            style={[
              GlobalStyles.changeFlexDirection,
              GlobalStyles.justifyContent,
            ]}>
            <View
              style={[
                GlobalStyles.changeFlexDirection,
                GlobalStyles.imagePadding,
              ]}>
              <Image
                style={GlobalStyles.allOrdersImage}
                source={require("../../../assets/images/icons/MaskGroup.png")}
              />
              <View style={GlobalStyles.textView}>
                <Text style={GlobalStyles.orderCardHeading}>
                  Unibic Dubai International
                </Text>
                <Text style={GlobalStyles.outletText}>Outlet : Abu Dhabi</Text>
                <View
                  style={[
                    GlobalStyles.changeFlexDirection,
                    GlobalStyles.ratingView,
                  ]}>
                  <View style={GlobalStyles.ratingPadding}>
                    <Star />
                  </View>
                  <View style={GlobalStyles.ratingPadding}>
                    <Star />
                  </View>
                  <View style={GlobalStyles.ratingPadding}>
                    <Star />
                  </View>
                  <View style={GlobalStyles.ratingPadding}>
                    <Star />
                  </View>

                  <Star />
                </View>
                <View
                  style={[
                    GlobalStyles.changeFlexDirection,
                    GlobalStyles.paddingThree,
                  ]}>
                  <View style={GlobalStyles.acticeView}>
                    <FontAwesome name='circle' size={5} color='green' />
                  </View>
                  <Text style={GlobalStyles.emailText}>
                    Pedding for approval
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={GlobalStyles.bottomLinePendingAcceptanceCard}>
            <View style={GlobalStyles.justifyContentCenter}>
              <Text style={GlobalStyles.aedValueText}>AED 12.55</Text>
            </View>

            <View style={GlobalStyles.justifyContentCenter}>
              <Text style={GlobalStyles.getTimeText}>
                Payment due by june 22
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PendingAcceptanceCard;
