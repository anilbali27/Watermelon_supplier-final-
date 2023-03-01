/** @format */

import React from "react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";
import SvgUri from "react-native-svg-uri-updated";

const SubCatalogueCard = (props) => {
  const in_stock = props.in_stock;

  return (
    // <View style={GlobalStyles.allOrderCardcardView}>
    //   <View style={GlobalStyles.allOrderCardInnerDimension}>
    //     <View style={{ width: "100%" }}>
    //       <View
    //         style={[
    //           GlobalStyles.changeFlexDirection,
    //           GlobalStyles.justifyContent,
    //         ]}>
    //         <View
    //           style={[
    //             GlobalStyles.changeFlexDirection,
    //             GlobalStyles.imagePadding,
    //           ]}>
    //           <Image
    //             style={GlobalStyles.allOrdersImage}
    //             source={require("../../../assets/images/icons/MaskGroup.png")}
    //           />
    //           <View style={GlobalStyles.textView}>
    //             <Text style={GlobalStyles.orderCardHeading}>
    //             {props.category_name}
    //             </Text>

    //             <Text style={GlobalStyles.Cateloguetext}>Product Code : {props.product_code}</Text>
    //             <Text style={GlobalStyles.Cateloguetext}>No.of SKU's  : {props.sku_name}</Text>

    //           </View>
    //         </View>
    //         {in_stock == 0 ? (
    //           <View style={GlobalStyles.orderPaid}>
    //             <Text style={GlobalStyles.paidText}>Out Stock</Text>
    //           </View>
    //         ) : (
    //           <View style={GlobalStyles.CataloguePaid}>
    //             <Text style={[GlobalStyles.paidText,GlobalStyles.justifyCenter,GlobalStyles.justifyContent]}>In stock</Text>
    //           </View>
    //         )}
    //       </View>

    //     </View>
    //   </View>
    // </View>
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
              GlobalStyles.textBlack,
              GlobalStyles.mb7,
            ]}>
            Product Code : {props.product_code}
          </Text>
          <Text
            style={[
              GlobalStyles.font10,
              GlobalStyles.textBlack,
              GlobalStyles.mb7,
            ]}>
            No.of SKU's : {props.sku_name}
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
          {/* <TouchableOpacity style={[GlobalStyles.marlft13]}>
                <SvgUri source={require('../../../assets/images/dashboard/trash_icon.svg')} />
            </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

export default SubCatalogueCard;
