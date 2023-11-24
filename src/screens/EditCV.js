import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import COLORS from '../assets/const/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const EditCV = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      getListCv();
    }, [])
  )
  const result = () => { 
    for (let i = 0; i < listCv.length; i++) { 
      console.log("List CV : ", listCv[i].user_id._id);
      if(listCv[i].user_id._id == user._id){
        listCvId.push(listCv[i]);
      }
    }
  };
  
  const [listCv, setListCv] = useState([]);
  const [listCvId, setListCvId] = useState([]); 
  const count = 0;
  const getListCv = async () => {
    try {
      axios({
        url: 'http://192.168.1.48:3000/cvs/list',
        method: 'GET',
      }).then((res) => {
        var response = res.data;
        // console.log("List CV : ", response);
        setListCv(response);
        result();
      })
    } catch (error) {
      console.log(error);
    }
  };
  const Jobdata = [
    {
      id: '1',
      title: 'Freelancer 1',
      Details: 'Dribble Inc.',
      Address: 'Quan 1, TP. HCM',
      wagemax: '150000',
      wagemin: '50000',
      worktype: 'Partime',
      uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png',
    },
    {
      id: '2',
      title: 'Freelancer 2',
      Details: 'Dribble Inc.',
      Address: 'Quan 1, TP. HCM',
      wagemax: '150000',
      wagemin: '50000',
      worktype: 'Partime',
      uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png',
    },
    {
      id: '3',
      title: 'Freelancer 3',
      Details: 'Dribble Inc.',
      Address: 'Quan 1, TP. HCM',
      wagemax: '150000',
      wagemin: '50000',
      worktype: 'Partime',
      uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png',
    },
    {
      id: '4',
      title: 'Freelancer 4',
      Details: 'Dribble Inc.',
      Address: 'Quan 1, TP. HCM',
      wagemax: '150000',
      wagemin: '50000',
      worktype: 'Partime',
      uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png',
    },
    {
      id: '5',
      title: 'Freelancer 5',
      Details: 'Dribble Inc.',
      Address: 'Quan 1, TP. HCM',
      wagemax: '150000',
      wagemin: '50000',
      worktype: 'Partime',
      uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png',
    },
  ];
  const FlatListb = () => {
    return (
      <FlatList
        data={listCv}
        keyExtractor={item => item.id}
        renderItem={renderItemJob}
        nestedScrollEnabled={true}
        scrollEnabled={false}
      />
    );
  };
  const renderItemJob = ({item}) => (
    <TouchableOpacity
      style={{
        width: 340,
        borderWidth: 0.5,
        borderColor: COLORS.grey,
        borderRadius: 20,
        marginBottom: 18,
        padding: 20,
      }}
      onPress={() =>
        navigation.navigate('DetailsScreen', {
          title: item.title,
          id: item.id,
          uri: item.uri,
          address: item.Address,
          wagemax: item.wagemax,
          wagemin: item.wagemin,
          worktype: item.worktype,
          Details: item.Details,
        })
      }>
      <View style={{width: '100%', flexDirection: 'row'}}>
        {/* <ImageBackground
          source={{uri: item.uri}}
          style={{width: 46, height: 46, marginBottom: 5}}
          imageStyle={{borderRadius: 5}}
        /> */}
        <View style={{width: '50%', height: '100%', marginStart: 20, flex: 1}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.title}</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: COLORS.grey}}>
            {item.current_address}
          </Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="bookmark-plus-outline" size={30} color={COLORS.blue} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 1,
          width: '99%',
          backgroundColor: COLORS.grey,
          opacity: 0.4,
          marginTop: 15,
          marginBottom: 8,
        }}
      />
      <View style={{width: '100%', paddingStart: '22%'}}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: COLORS.grey}}>
          {item.describe}
        </Text>
        <Text style={{color: COLORS.blue, fontSize: 16, marginVertical: 9}}>
          {item.experience_id.e_title}
        </Text>
        <View
          style={{
            width: 60,
            height: 25,
            borderWidth: 0.5,
            borderColor: COLORS.grey,
            borderRadius: 7,
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 10}}>{item.worktype_id.wt_title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <ScrollView>
      <View style={{width: '100%', paddingBottom: '50%'}}>
        <View style={{alignItems: 'center'}}>
          <FlatListb />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditCV;

const styles = StyleSheet.create({});
