/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState, useContext } from 'react';
import { FlatList, Image, TextInput, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import fireStore from '@react-native-firebase/firestore';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import UserContext from '../components/UserConText';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChatScreen = ({ route, navigation }) => {

    useEffect(() => {
        const subscriber = fireStore()
            .collection('chats')
            .doc(user.googleId + route.params.item.userId)
            .collection('messages')
            .orderBy('createdAt', 'desc');
        subscriber.onSnapshot(querySnapshot => {
            const allMessages = querySnapshot.docs.map(item => {
                return { ...item._data, createdAt: item._data.createdAt };
            });
            setMessageList(allMessages);
        });
        return () => subscriber();
    }, []);

    const [messageList, setMessageList] = useState([]);
    const { user } = useContext(UserContext);

    const onSend = useCallback(async (messages = []) => {
        const msg = messages[0];
        const myMsg = {
            ...msg,
            sendBy: user.googleId,
            sendTo: route.params.item.userId,
            createdAt: Date.parse(msg.createdAt),
        };
        setMessageList(previousMessages =>
            GiftedChat.append(previousMessages, myMsg),
        );
        fireStore()
            .collection('chats')
            .doc('' + user.googleId + route.params.item.userId)
            .collection('messages')
            .add(myMsg);
        fireStore()
            .collection('chats')
            .doc('' + route.params.item.userId + user.googleId)
            .collection('messages')
            .add(myMsg);
    }, []);

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View style={{ marginRight: 10, marginBottom: 8 }}>
                    <Ionicons name="send" size={28} color={COLORS.primary} />
                </View>
            </Send>
        );
    };

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Header */}
            <View style={{ paddingHorizontal: 18, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Ionicons name='arrow-back' size={26} />
                </TouchableOpacity>
                <Image source={{ uri: route.params.item.photo }} style={{ width: 32, aspectRatio: 1, borderRadius: 32 }} />
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 20, color: COLORS.black, fontWeight: "600", width: 180 }} numberOfLines={1}>
                        {route.params.item.displayName}
                    </Text>
                </View>
                <TouchableOpacity>
                    <MaterialCommunityIcons name='dots-horizontal-circle-outline' size={26} color={COLORS.black} />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, }}>
                <GiftedChat
                    imageStyle={{ aspectRatio: 1 }}
                    placeholder='Nhập tin nhắn'
                    renderSend={renderSend}
                    isTyping={true}
                    messages={messageList}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: user.googleId,
                    }}
                />
            </View>
        </SafeAreaView>

    )
}

export default ChatScreen;