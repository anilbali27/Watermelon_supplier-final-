/** @format */

import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  Alert,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import SvgUri from "react-native-svg-uri-updated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../../../assets/css/styles";
import { useForm, Controller } from "react-hook-form";
import ModalSelector from "react-native-modal-selector";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../../screens/Services/API/CallingApi";
import { endPoint } from "../../screens/Services/API/ApiConstants";
export default function SupplierProfile({ navigation, route }) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
    getValues,
    setValue,
  } = useForm();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [countrykey, setcountrykey] = useState("Select");
  const [profileDatta, setProfileDatta] = useState([]);
  const [designation, setdesignation] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setaddress2] = useState("");
  const [id, setId] = useState("");
  const [notified, setNotified] = useState("");
  const [countryCode, setcountryCode] = useState("Select");
  const [userdata, setUserdata] = useState([]);
  // country code
  const CountryCodeData = [
    { key: 0, label: "Select" },
    { key: 1, label: "UAE (+971)" },
  ];

  useEffect(() => {
    getProfile();
  }, []);

  //get Profile
  const getProfile = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const jsonId = await AsyncStorage.getItem("id");
    console.log(jsonId, "jsonId");
    let token = jsonValue;
    var myJson = {
      //"id": jsonId ,
      id: "63fc4a69d2186d5dbf0e9790",
    };

    const result = await api.getProfile(token, endPoint.get_profile, myJson);
    console.log(result, "getprofile");

    if (result) {
      setProfileDatta(result.data);
      setEmail(result.data.email);
      setId(result.data.company_registration_no);
      setMobileNumber(result.data.mobile_no);
      setcountrykey(result.data.mobile_no_code);
      setName(result.data.w_name);
      setAddress(result.data.address);
      setName(result.data.firstname);
    } else {
      setProfileDatta([]);
    }
  };

  const onSubmit = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const jsonId = await AsyncStorage.getItem("id");
    const jsonUserId = await AsyncStorage.getItem("userTypeId");

    let token = jsonValue;
    var myJson = {
      firstname: name,
      lastname: "n",
      email: email,
      mobile_no: mobileNumber,
      designation: designation,
      password: "",
      confirm_password: "",
      user_type: "2",
      user_type_id: jsonUserId,
      company_name: "baryons123",
      company_registration_no: "500",
      id: "63fc9812be1995bb0f06f6e7",
      role_id: 0,
    };
    console.log(myJson, "oi7856g66");

    const result = await api.updateUser(token, endPoint.update_user, myJson);
    console.log(result, "67676778787878");

    if (result) {
      Alert.alert(result.message);
      setUserdata(result.data);
    } else {
      setUserdata([]);
    }
  };
  return (
    <ScrollView style={[styles.whiteBg]}>
      {/* profile header */}
      <View style={[styles.profileHeader, styles.primaryBg]}>
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
          }}>
          <SvgUri
            source={require("../../../assets/images/dashboard/sidemenu_icon.svg")}
          />
        </TouchableOpacity>
        <View style={[styles.flexColumn, styles.alignCenter]}>
          <Image
            source={require("../../../assets/images/dashboard/profile_icon.png")}
            style={[
              styles.profilelogo,
              styles.resizeContain,
              styles.mb9,
            ]}></Image>
          <Text
            style={[
              styles.textWhite,
              styles.fontBold,
              styles.mb4,
              styles.font16,
            ]}>
            Haadiya Talwar
          </Text>
          <Text style={[styles.textWhite, styles.mb16, styles.font14]}>
            +971 9874 5678
          </Text>
          <TouchableOpacity
            style={[styles.whiteBg, styles.editProfileBtn, styles.mb28]}
            onPress={handleSubmit(onSubmit)}>
            <Text style={[styles.font12, styles.textPri]}>EDIT PROFILE</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.font13, styles.textWhite, styles.mb6]}>
          Profile Completion : 87%
        </Text>
        <View style={[styles.profileprogressBg]}>
          <View
            style={[
              styles.whiteBg,
              styles.progressBar,
              { width: "87%" },
            ]}></View>
        </View>
      </View>
      {/* profile header - Ends */}

      {/* profile container */}
      <View style={[styles.profileContainer]}>
        <Text
          style={[
            styles.font14,
            styles.textBlack,
            styles.mb16,
            styles.fontBold,
          ]}>
          Personal Information
        </Text>

        <View style={styles.inputView}>
          <Text
            style={[
              styles.labelText,
              styles.font12,
              styles.fontMed,
              styles.mb4,
            ]}>
            Email ID<Text style={[styles.font12, styles.textPri1]}>*</Text>
          </Text>
          <View>
            <Controller
              name='email'
              control={control}
              // rules={{ required: "Email Id is required." }}
              render={(props) => (
                <TextInput
                  style={[styles.inputStyle, styles.fontMed]}
                  placeholder='Email ID'
                  placeholderTextColor='#222B2E'
                  onChangeText={(email) => {
                    props.field.onChange(email);

                    setEmail(email);
                  }}
                  value={email}
                />
              )}
            />
            {errors && errors.email && (
              <Text style={[styles.errorMsg]}>{errors.email.message}</Text>
            )}
          </View>
        </View>

        <View style={styles.inputView}>
          <Text
            style={[
              styles.labelText,
              styles.font12,
              styles.fontMed,
              styles.mb4,
            ]}>
            Registration No
            <Text style={[styles.font12, styles.textPri1]}>*</Text>
          </Text>
          <View>
            <Controller
              name='id'
              control={control}
              //rules={{ required: "Registration No is required." }}
              render={(props) => (
                <TextInput
                  style={[styles.inputStyle, styles.fontMed]}
                  placeholder='Registration No'
                  placeholderTextColor='#222B2E'
                  onChangeText={(id) => {
                    props.field.onChange(id);

                    setId(id);
                  }}
                  value={id}
                />
              )}
            />
            {errors && errors.id && (
              <Text style={[styles.errorMsg]}>{errors.id.message}</Text>
            )}
          </View>
        </View>

        <View style={[styles.imageIcon, styles.inputView]}>
          <View style={[styles.width40, styles.padR7]}>
            <Text
              style={[
                styles.labelText,
                styles.font12,
                styles.fontMed,
                styles.mb4,
              ]}>
              Country Code
              <Text style={[styles.font12, styles.textPri1]}>*</Text>
            </Text>
            <View>
              <SvgUri
                source={require("../../../assets/images/dashboard/dropdown.svg")}
                style={[styles.modalDropDown]}
              />

              <Controller
                name='countryCode'
                control={control}
                // rules={{ required: "Country code is required." }}
                render={(props) => (
                  <ModalSelector
                    data={CountryCodeData}
                    initValue={countrykey}
                    selectStyle={[
                      [styles.inputStyle, styles.fontMed],
                      styles.flexRow,
                      styles.alignCenter,
                      styles.justifyStart,
                    ]}
                    initValueTextStyle={[
                      styles.font15,
                      styles.textBlack,
                      styles.fontMed,
                    ]}
                    overlayStyle={[
                      styles.popupOverlay,
                      styles.flexColumn,
                      styles.justifyEnd,
                      styles.alignCenter,
                    ]}
                    optionContainerStyle={[styles.width300px]}
                    cancelStyle={[styles.width300px, styles.marHorauto]}
                    optionTextStyle={[styles.textBlack, styles.font15]}
                    cancelTextStyle={[styles.textBlack, styles.font15]}
                    onChange={(option) => {
                      if (option.key) {
                        setcountryCode(option.label);
                        setcountrykey(option.label);
                        props.field.onChange(option.label);
                      }
                    }}
                    value={countrykey}
                  />
                )}
              />
              {errors && errors.countryCode && (
                <Text style={[styles.errorMsg]}>
                  {errors.countryCode.message}
                </Text>
              )}
            </View>
          </View>
          <View style={[styles.width60, styles.padR9]}>
            <Text
              style={[
                styles.labelText,
                styles.font12,
                styles.fontMed,
                styles.mb4,
              ]}>
              Mobile No<Text style={[styles.font12, styles.textPri1]}>*</Text>
            </Text>
            <View>
              <Controller
                name='mobileNumber'
                control={control}
                // rules={{ required: "Mobile number is required." }}
                render={(props) => (
                  <TextInput
                    style={[styles.inputStyle, styles.fontMed]}
                    placeholder='Mobile No'
                    keyboardType='numeric'
                    maxLength={10}
                    placeholderTextColor='#222B2E'
                    onChangeText={(mobileNumber) => {
                      setMobileNumber(mobileNumber);
                      props.field.onChange(mobileNumber);
                    }}
                    value={mobileNumber}
                  />
                )}
              />
              {errors && errors.mobileNumber && (
                <Text style={[styles.errorMsg]}>
                  {errors.mobileNumber.message}
                </Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.inputView}>
          <Text
            style={[
              styles.labelText,
              styles.font12,
              styles.fontMed,
              styles.mb4,
            ]}>
            Assigned Warehouse
            <Text style={[styles.font12, styles.textPri1]}>*</Text>
          </Text>
          <View>
            <Controller
              name='name'
              control={control}
              // rules={{ required: "Assigned Warehouse is required." }}
              render={(props) => (
                <TextInput
                  style={[styles.inputStyle, styles.fontMed]}
                  placeholder='Assigned Warehouse'
                  placeholderTextColor='#222B2E'
                  onChangeText={(name) => {
                    props.field.onChange(name);

                    setName(name);
                  }}
                  value={name}
                />
              )}
            />
            {errors && errors.name && (
              <Text style={[styles.errorMsg]}>{errors.name.message}</Text>
            )}
          </View>
        </View>

        <View style={styles.inputView}>
          <Text
            style={[
              styles.labelText,
              styles.font12,
              styles.fontMed,
              styles.mb4,
            ]}>
            Designation<Text style={[styles.font12, styles.textPri1]}>*</Text>
          </Text>
          <View>
            <Controller
              name='designation'
              control={control}
              // rules={{ required: "Designation is required." }}
              render={(props) => (
                <TextInput
                  style={[styles.inputStyle, styles.fontMed]}
                  placeholder='Designation'
                  placeholderTextColor='#222B2E'
                  onChangeText={(designation) => {
                    props.field.onChange(designation);

                    setdesignation(designation);
                  }}
                />
              )}
            />
            {errors && errors.designation && (
              <Text style={[styles.errorMsg]}>
                {errors.designation.message}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.inputView}>
          <Text
            style={[
              styles.labelText,
              styles.font12,
              styles.fontMed,
              styles.mb4,
            ]}>
            Get Notified When
            <Text style={[styles.font12, styles.textPri1]}>*</Text>
          </Text>
          <View>
            <Controller
              name='notified'
              control={control}
              // rules={{ required: "Designation is required." }}
              render={(props) => (
                <TextInput
                  style={[styles.inputStyle, styles.fontMed]}
                  placeholder='Get Notified When'
                  placeholderTextColor='#222B2E'
                  onChangeText={(notified) => {
                    props.field.onChange(notified);

                    setNotified(notified);
                  }}
                />
              )}
            />
            {errors && errors.notified && (
              <Text style={[styles.errorMsg]}>{errors.notified.message}</Text>
            )}
          </View>
        </View>
        <Text
          style={[
            styles.font14,
            styles.textBlack,
            styles.mb16,
            styles.fontBold,
          ]}>
          My Address
        </Text>
        <View
          style={[
            styles.homeContainerBlk,
            styles.flexColumn,
            styles.alignStart,
            styles.mb12,
          ]}>
          <TouchableOpacity style={[styles.addHomeView, styles.mb12]}>
            <Text style={[styles.font13, styles.textPri]}>Home</Text>
          </TouchableOpacity>

          <View style={[styles.width100]}>
            <Controller
              name='address'
              control={control}
              //rules={{ required: "Address is required." }}
              render={(props) => (
                <TextInput
                  multiline={true}
                  textAlignVertical='top'
                  numberOfLines={8}
                  style={[styles.inputStyle, styles.fontMed, styles.textArae]}
                  placeholder='Address'
                  placeholderTextColor='#222B2E'
                  onChangeText={(address) => {
                    setAddress(address);
                    props.field.onChange(address);
                  }}
                  value={address}
                />
              )}
            />
            {errors && errors.address && (
              <Text style={[styles.errorMsg]}>{errors.address.message}</Text>
            )}
          </View>
        </View>

        <View
          style={[
            styles.homeContainerBlk,
            styles.flexColumn,
            styles.alignStart,
            styles.mb12,
          ]}>
          <TouchableOpacity style={[styles.addHomeView, styles.mb12]}>
            <Text style={[styles.font13, styles.textPri]}>Office Address</Text>
          </TouchableOpacity>
          <View style={[styles.width100]}>
            <Controller
              name='address1'
              control={control}
              //rules={{ required: "Address1 is required." }}
              render={(props) => (
                <TextInput
                  multiline={true}
                  textAlignVertical='top'
                  numberOfLines={8}
                  style={[styles.inputStyle, styles.fontMed, styles.textArae]}
                  placeholder='Address'
                  placeholderTextColor='#222B2E'
                  onChangeText={(address1) => {
                    setAddress1(address1);
                    props.field.onChange(address1);
                  }}
                />
              )}
            />
            {errors && errors.address1 && (
              <Text style={[styles.errorMsg]}>{errors.address1.message}</Text>
            )}
          </View>
        </View>
      </View>
      {/* <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <View style={[styles.saveButtonFooter, styles.whiteBg]}>
          <Button style={[styles.primaryBg, styles.saveBtn, styles.width100]}>
            <Text
              style={[
                styles.font15,
                styles.letterSpa33,
                styles.textWhite,
                styles.fontMed,
              ]}>
             Submit
            </Text>
          </Button>
        </View>
      </TouchableOpacity> */}
    </ScrollView>
  );
}
