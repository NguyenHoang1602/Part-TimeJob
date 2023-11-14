/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable keyword-spacing */
/* eslint-disable jsx-quotes */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable semi */
import React,{useState} from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, FlatList } from 'react-native';


//
import Input from '../components/Input';
import COLORS from '../assets/const/colors';
import Button from '../components/Button';
//icon
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import IconWithBadge from '../components/IconWithBadge';
import IconWithBadgeAntDesign from '../components/IconWithBadgeAntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';

const NotificationScreen = ({ route, navigation }) => {
    const data = [
        {id:"1",title: "Security Updates 1!", describes: "You don’t have any notifications at this time you don’t have any notifications", daytime: "15 Oct, 2023 | 18:10 PM", category:"problem2"},
        {id:"2",title: "Security Updates 2!", describes: "You don’t have any notifications at this time you don’t have any notifications", daytime: "15 Oct, 2023 | 18:10 PM", category:"problem"},
        {id:"3",title: "Security Updates 3!", describes: "You don’t have any notifications at this time you don’t have any notifications", daytime: "15 Oct, 2023 | 18:10 PM", category:"problem1"},
        {id:"4",title: "Security Updates 4!", describes: "You don’t have any notifications at this time you don’t have any notifications", daytime: "15 Oct, 2023 | 18:10 PM", category:"problem"},
        {id:"5",title: "Security Updates 5!", describes: "You don’t have any notifications at this time you don’t have any notifications", daytime: "15 Oct, 2023 | 18:10 PM", category:"problem"},
        {id:"6",title: "Security Updates 6!", describes: "You don’t have any notifications at this time you don’t have any notifications", daytime: "15 Oct, 2023 | 18:10 PM", category:"problem"},
        {id:"7",title: "Security Updates 7!", describes: "You don’t have any notifications at this time you don’t have any notifications", daytime: "15 Oct, 2023 | 18:10 PM", category:"problem"},
        {id:"8",title: "Security Updates 8!", describes: "You don’t have any notifications at this time you don’t have any notifications", daytime: "15 Oct, 2023 | 18:10 PM", category:"problem"},
        {id:"9",title: "Security Updates 9!", describes: "You don’t have any notifications at this time you don’t have any notifications", daytime: "15 Oct, 2023 | 18:10 PM", category:"problem1"},
        {id:"10",title: "Security Updates 10!", describes: "You don’t have any notifications at this time you don’t have any notifications", daytime: "15 Oct, 2023 | 18:10 PM", category:"problem"},
    ];
    // check data set shouldshow
    const Checkdata = ()=>{
        if(data == ""){
            return true;
        }else{
            return false;
        }
    }
    const shouldShow = Checkdata();
    const renderItem = ({ item }) => (
          <View style={{
            width: "100%",
            marginBottom: 18,
            // borderWidth: 0.5,
            // borderColor: COLORS.grey,
            // borderRadius: 10,
            padding: 10,
          }}>
            <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <View style={{ width: 60, height: 60, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                    {item.category == 'problem1' ? (
                        <FontAwesome name='briefcase' size={30} color="#FD9B10"/>
                    ) : item.category == 'problem2' ? (
                        <FontAwesome name='briefcase' size={30} color={COLORS.red}/>
                    ) : <FontAwesome name='briefcase' size={30} color={COLORS.blue}/>
                    }
                </View>
                <View style={{flexDirection:'column', flex: 1, justifyContent: 'center'}}>
                    <Text style={{fontSize: 18, fontWeight: '700', color: COLORS.black}}>{item.title}</Text>
                    <Text style={{fontSize: 14, fontWeight: '500', color: COLORS.black, opacity: 0.5}}>{item.daytime}</Text>
                </View>
                <View style={{width: 40, height: 23, borderRadius: 5, backgroundColor: COLORS.blue, justifyContent:'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 8, color: COLORS.white}}>News</Text>
                </View>
            </View>
            <Text style={{fontSize: 16, fontWeight: '400', color: COLORS.black, opacity: 0.8}}>{item.describes}</Text>
          </View>
      );
    return (
        <SafeAreaView style={{ flex: 1, paddingVertical: 18, backgroundColor: COLORS.white}}>
            {/* Headers */}
           <View
            style={{
                flexDirection: 'row',
                paddingHorizontal: 18,
                paddingBottom: 15,
                alignItems: 'center',
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color={COLORS.black} />
                </TouchableOpacity>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{fontSize: 22, fontWeight: "600", color: COLORS.black}}>Notification</Text>
                </View>
                <Ionicons name="ellipsis-horizontal-circle" size={30} color={COLORS.black} />
            </View>
            {/* body */}
            {
                shouldShow ? (
                    <View style={{alignItems: 'center', width: '100%', height: '100%', justifyContent: 'center'}}>
                        <ImageBackground
                            source={require('../assets/images/5928293_2953962.jpg')}
                            style={{ width: "108%", height: 430, marginEnd: '9%', marginBottom: -25}}
                        />
                        <Text style={{fontSize: 22, color: COLORS.black, fontWeight: '700'}}>Empty</Text>
                        <Text style={{fontSize: 16, marginTop: 7, marginBottom: '50%'}}>You don’t have any notifications at this time</Text>
                  </View>
                ) : <ScrollView  showsVerticalScrollIndicator={false} style={{ paddingEnd: 10, paddingStart: 10, paddingTop: 10}}>
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                            nestedScrollEnabled={true}
                            scrollEnabled={false}
                        />
                    </ScrollView>
              }
        </SafeAreaView>
    );
}
export default NotificationScreen;