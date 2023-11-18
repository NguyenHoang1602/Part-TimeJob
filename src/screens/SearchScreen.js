/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { FlatList, Image, TextInput, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Modal from "react-native-modal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SalaryRangeSelector from '../components/SalaryRangeSelector';
import { Dropdown } from 'react-native-element-dropdown';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const URL_IMG = "https://s3-alpha-sig.figma.com/img/acc1/c7a7/e9c43527e435b8c79bc8126d3d053264?Expires=1700438400&Signature=YkRmo~i-p6AZ1AulSOjpW4wA3UdrSHH2zV8WQihLw5uEordi8QWRvjnTz8mWYDq4ZkRCCVDBz1xuFXGQtgMqAStOpOvBGzkzNvHMeK4xw6AsufXB2uI2IIfmL2LgzBHgwk2l6IM3Rxb-4I9wdC8aSg1r9x9KwN~e31NOH19C3w1~A9jSJHDWJk9ECpnIqIrYRwzIfBR6nDOWxXZqjwn-Y8rg94RJb1UZYGQhSe9~MYAq1LzHKO0imJe1lpNv6dYv~amXSnfuuZW2awviacARGnYIjO~rDGmP339lgP9Df71ZKGUxsgIQpK26gCH0IoaFY1B9riTOaj2ENioGaqJurg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";

const MAX_PRICE = 500;

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const Jobdata = [
  { id: '1', title: 'Freelancer', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '2', title: 'Freelancer', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '3', title: 'Freelancer', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '4', title: 'Freelancer', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '5', title: 'Freelancer', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
]

const SavedJobsScreen = ({ navigation }) => {

  const [password, setPassword] = useState('');
  const [isFocusedPass, setIsFocusedPass] = useState(false);

  const [isSave, setSave] = useState(false);
  const [isFound, setFound] = useState(false);

  const [startPrice, setStartPrice] = useState(50);
  const [endPrice, setEndPrice] = useState(250);

  const [isModalVisibleSave, setModalVisibleSave] = useState(false);
  const [isModalVisibleFilter, setModalVisibleFiler] = useState(false);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [isWorkType, setWorkType] = [
    { label: 'Inside (Work at Office)', value: 0 },
    { label: 'Remote (Work at Home)', value: 1 }
  ];

  const toggleModalSave = () => {
    setModalVisibleSave(!isModalVisibleSave);
  };

  const toggleModalFilter = () => {
    setModalVisibleFiler(!isModalVisibleFilter);
  };
  const FlatListb = () => {
    return (
      <FlatList
        data={Jobdata}
        keyExtractor={(item) => item.id}
        renderItem={renderItemJob}
        nestedScrollEnabled={true}
        scrollEnabled={false}
      />
    );

  }

  const renderItemJob = ({ item }) => (

    <View style={{ padding: 18, }}>
      <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity, borderCurve: 'continuous' }}>
        <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 18 }}>
          <Image source={{ uri: URL_IMG }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600", }} numberOfLines={1}>
              UI/UX Designer
            </Text>
            <Text style={{ fontSize: 16, color: COLORS.grey, paddingTop: 4 }} numberOfLines={1}>
              John Sena
            </Text>
          </View>
          <TouchableOpacity onPress={toggleModalSave}>
            <MaterialCommunityIcons name={!isSave ? 'bookmark-minus' : 'bookmark-minus-outline'} size={26} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity, }} />

        <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 12 }}>
          <View style={{ paddingStart: 60 }}>
            <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600", }} numberOfLines={1}>
              UI/UX Designer
            </Text>
            <Text style={{ fontSize: 16, color: COLORS.primary, paddingVertical: 4 }} numberOfLines={1}>
              ${item.wagemin} - {item.wagemax} /month
            </Text>
            <View style={{
              width: 60,
              borderWidth: 0.5,
              borderColor: COLORS.grey,
              borderRadius: 7,
              padding: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{ fontSize: 10 }}>{item.worktype}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (

    <SafeAreaView style={{ paddingVertical: 18, gap: 16, backgroundColor: 'white', height: '100%' }}>

      {/* Search */}
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 18,
          alignItems: 'center',
          gap: 12,
        }}>
        <TouchableOpacity onPress={() => {
          navigation.goBack()
        }}>
          <Ionicons name='chevron-back-outline' size={24} color={COLORS.grey} />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            height: 50,
            borderRadius: 15,
            alignItems: 'center',
            paddingHorizontal: 18,
            backgroundColor: "#F5F5F5",
            backgroundColor: !isFocusedPass ? COLORS.lightGrey : COLORS.blue,
            borderWidth: 1,
            borderColor: !isFocusedPass ? COLORS.white : COLORS.primary
          }}>
          <AntDesign name='search1' size={24} color={!isFocusedPass ? COLORS.grey : COLORS.primary} />
          <TextInput
            placeholder="Search . . ."
            value={password}
            onChangeText={(value) => {
              setPassword(value)
            }}
            onFocus={() => { setIsFocusedPass(!isFocusedPass) }}
            onBlur={() => { setIsFocusedPass(!isFocusedPass) }}
            style={{ flex: 1, fontSize: 16, color: COLORS.black, paddingHorizontal: 10, }} />
          <TouchableOpacity onPress={() => {
            toggleModalFilter()
          }}>
            <FontAwesome6 name='sliders' size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Found Nav */}
      <View style={styles.foundNav}>
        <View style={{ flex: 1 }}>
          <Text style={styles.textFound}>
            0 Found
          </Text>
        </View>
        <TouchableOpacity onPress={() => {

        }}>
          <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Show Search */}

      {isFound ?
        //Found
        <View style={styles.found}>
          <ScrollView>

            <FlatListb />

          </ScrollView>
        </View>
        :
        //No Found
        <View style={styles.show}>
          <Image
            source={{
              uri: URL_IMG
            }}
            style={styles.imgNoFound}
          />
          <Text style={styles.titleNoFound}>
            Not Found
          </Text>
          <Text style={styles.textNoFound}>
            Sorry, the keyword you entered cannot be found, please check again or search with another keyword.
          </Text>
        </View>
      }

      {/* Modal Save job */}
      <Modal isVisible={isModalVisibleSave} style={{ justifyContent: 'flex-end', margin: 0 }}>
        <View style={{ backgroundColor: 'white', padding: 18, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 25, borderTopLeftRadius: 25 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.black }}>Remove from Saved ?</Text>

          <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity, marginVertical: 10, width: "100%" }} />

          <View style={{ paddingVertical: 18, width: "100%" }}>
            <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity }}>
              <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 18 }}>
                <Image source={{ uri: URL_IMG }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600", }} numberOfLines={1}>
                    UI/UX Designer
                  </Text>
                  <Text style={{ fontSize: 16, color: COLORS.grey, paddingTop: 4 }} numberOfLines={1}>
                    John Sena
                  </Text>
                </View>
                <TouchableOpacity>
                  <MaterialCommunityIcons name={!isSave ? 'bookmark-minus' : 'bookmark-minus-outline'} size={26} color={COLORS.primary} />
                </TouchableOpacity>
              </View>

              <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity, }} />

              <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 12 }}>
                <View style={{ paddingStart: 60 }}>
                  <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600", }} >
                    UI/UX Designer
                  </Text>
                  <Text style={{ fontSize: 16, color: COLORS.primary, paddingVertical: 4 }} >
                    $1000 - 2000/month
                  </Text>
                  <View style={{
                    width: 70,
                    borderWidth: 0.5,
                    borderColor: COLORS.grey,
                    borderRadius: 7,
                    padding: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={{ fontSize: 10 }}>Partime</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{
            flexDirection: 'row'
          }}>
            <TouchableOpacity
              onPress={toggleModalSave}
              style={{
                backgroundColor: COLORS.blue,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 64,
                position: "relative",
                width: 160,
                paddingVertical: 15,
                marginEnd: 15
              }}>
              <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: "600", }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 64,
                position: "relative",
                width: 160,
                paddingVertical: 15
              }}>
              <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "600", }}>Yes, Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Filter */}
      <Modal isVisible={isModalVisibleFilter} style={{ margin: 0 }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaView style={{ backgroundColor: 'white', padding: 18 }}>
            {/* Tilter */}

            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <AntDesign name='close' size={24} color={COLORS.black} />
              <Text style={{ paddingStart: 10, fontSize: 18, fontWeight: '700', color: COLORS.black }}>Filter Options</Text>
            </View>

            {/* Filter Options */}
            <View style={{ alignItems: 'center', height: '100%', }}>
              {/* Location & Salary */}
              <View style={{ paddingVertical: 18, width: "100%" }}>
                <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity }}>

                  <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 18 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "700", }} numberOfLines={1}>
                        Location & Salary
                      </Text>
                    </View>
                    <TouchableOpacity>
                      <MaterialCommunityIcons name={!isSave ? 'bookmark-minus' : 'bookmark-minus-outline'} size={26} color={COLORS.primary} />
                    </TouchableOpacity>
                  </View>

                  <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity, }} />

                  <View style={{ gap: 8, paddingVertical: 12 }}>
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: COLORS.darkBlue }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={data}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? 'Vị trí' : '...'}
                      searchPlaceholder="Search..."
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                      }}
                    />

                    {/* Range Salary */}
                    <SalaryRangeSelector
                      minPrice={0}
                      maxPrice={MAX_PRICE}
                      startPrice={startPrice}
                      endPrice={endPrice}
                      onStartPriceChange={setStartPrice}
                      onEndPriceChange={setEndPrice}
                    />
                  </View>
                </View>
              </View>
              {/* Work Type */}
              <View style={{ paddingVertical: 18, width: "100%" }}>
                <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity }}>

                  <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 18 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "700", }} numberOfLines={1}>
                        Work Type
                      </Text>
                    </View>
                    <TouchableOpacity>
                      <MaterialCommunityIcons name={!isSave ? 'bookmark-minus' : 'bookmark-minus-outline'} size={26} color={COLORS.primary} />
                    </TouchableOpacity>
                  </View>

                  <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity, }} />

                  <View style={{ gap: 8, paddingVertical: 12 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10}}>
                      <TouchableOpacity style={styles.radio} onPress={{}}/>
                      <Text style={styles.textWorkType}>
                        Onsite (Work at Office)
                      </Text>
                    </View>

                    <View style={{}}>
                      <Text style={styles.textWorkType}>
                        Remote (Work at Home)
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* Sex Type */}
              <View style={{ paddingVertical: 18, width: "100%" }}>
                <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity }}>

                  <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 18 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "700", }} numberOfLines={1}>
                        Sex Type
                      </Text>
                    </View>
                    <TouchableOpacity>
                      <MaterialCommunityIcons name={!isSave ? 'bookmark-minus' : 'bookmark-minus-outline'} size={26} color={COLORS.primary} />
                    </TouchableOpacity>
                  </View>

                  <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity, }} />

                  <View style={{ gap: 8, paddingVertical: 12 }}>
                    <View style={{}}>
                      <Text style={styles.textWorkType}>
                        Male
                      </Text>
                    </View>

                    <View style={{}}>
                      <Text style={styles.textWorkType}>
                        Female
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* Button */}
              <View style={{
                flexDirection: 'row',
                bottom: 40,
                position: 'absolute',
                shadowColor: 'red'
              }}>
                <TouchableOpacity
                  onPress={toggleModalFilter}
                  style={{
                    backgroundColor: COLORS.blue,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 64,
                    position: "relative",
                    width: 160,
                    paddingVertical: 15,
                    marginEnd: 15
                  }}>
                  <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: "600", }}>Reset</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 64,
                    position: "relative",
                    width: 160,
                    paddingVertical: 15
                  }}>
                  <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "600", }}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </GestureHandlerRootView>
      </Modal>
    </SafeAreaView>

  )
}

export default SavedJobsScreen;

const styles = StyleSheet.create({
  foundNav: {
    flexDirection: 'row',
    paddingHorizontal: 20,

  },
  textFound: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
  },
  titleNoFound: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
  },
  show: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  imgNoFound: {
    height: 300,
    width: '100%',
  },
  textNoFound: {
    fontSize: 18,
    color: COLORS.black,
    textAlign: 'center'
  },
  dropdown: {
    height: 50,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 10,
    paddingHorizontal: 18,
    marginVertical: 13,
  },
  placeholderStyle: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '500'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 50,
    fontSize: 14,
    borderRadius: 6,
  },
  textWorkType: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '500',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    padding: 5
  },
});