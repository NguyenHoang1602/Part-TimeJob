/* eslint-disable react-hooks/exhaustive-deps */
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

    const [messageList, setMessageList] = useState([]);
    const { user } = useContext(UserContext);
    const data = {
        _id : route.params?.item._id,
        photo : route.params?.item.photo,
        displayName : route.params?.item.displayName,
    };
    const [items , setItem ] = useState(data)

    /* sử dụng useeffect để lắng nghe sự thay đổi trong collection chat và message của firestore
    khi có sự thay đổi, nó sẽ lấy tất cả tin nhắn từ đoạn chat và cập nhật danh sách tin nhắn
    cụ thể, nó tạo ra 1 subscriber bằng cách truy vấn collection chat, sau đó lắng nghe sự thay đổi bằng phương thức
    onSnapshot, khi có sự thay đổi, nó sẽ lấy tất cả các tài liệu trong querySnapshot và chuyển đổi chúng thành 1 mảng 
    các tin nhắn. Cuối cùng cập nhật danh sách tin nhắn bằng cách gọi setMessageList với mảng tin nhắn mới
    */
    useEffect(() => {
        const subscriber = fireStore()
            .collection('chats')
            // tìm đoạn chat có id, tạo bằng cách
            .doc(user._id + items?._id)
            .collection('messages')
            .orderBy('createdAt', 'desc');
        subscriber.onSnapshot(querySnapshot => {
            // lấy tất cả tin nhắn từ đoạn chat
            const allMessages = querySnapshot.docs.map(item => {
                return { ...item._data, createdAt: item._data.createdAt };
            });
            setMessageList(allMessages);
        });
        return () => {
            if (typeof subscriber === 'function') {
                subscriber();
            }
        };
    }, []);

    const onSend = useCallback(async (messages = []) => {
        // khai báo 1 biến lấy tin nhắn đầu tiên từ mảng tin nhắn được truyền vào
        const msg = messages[0];
        /* tạo 1 đối tượng tin nhắn mới bằng cách sao chép các thuộc tính từ tin nhắn ban đầu (msg), 
        đồng thời thêm các thuộc tính
        */
        const myMsg = {
            ...msg,
            sendBy: user._id,
            sendTo: items?._id,
            createdAt: Date.parse(msg.createdAt),
        };
        // cập nhật danh sách tin nhắn bằng cách thêm tin nhắn mới (myMsg) vào cuối danh sách tin nhắn hiện tại (previous)
        setMessageList(previousMessages =>
            GiftedChat.append(previousMessages, myMsg),
        );
        
        /* sử dụng firestore để truy vấn collection chát và sử dụng phương thức doc để truy cập đến document của đoạn chat
        giữa hai người, document được định danh bằng cách kết hợp giữa 2 id.
        tiếp theo truy vấn đến collection messages trong doc và sử dụng phương thức add() để thêm tin nhắn mới (myMsg)
        vào collection messages
        cuối cùng, nó thực hiện các bước tương tự để lưu tin nhắn vào document của đoạn chat giữa 2 người dùng theo thứ tự
        ngược lại
        */
       // tạo ra 2 đoạn chat
        fireStore()
            .collection('chats')
            .doc('' + user._id + items?._id)
            .collection('messages')
            .add(myMsg);
        fireStore()
            .collection('chats')
            .doc('' + items?._id + user._id)
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

    const renderImage = (props) => {
        const { currentMessage } = props;
        return (
            <Image
                source={{ uri: currentMessage.user.avatar }}
                style={{ width: 4, height: 40, borderRadius: 20 }}
            />
        );
    };
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Header */}
            <View style={{ paddingHorizontal: 18, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='arrow-back' size={26} />
                </TouchableOpacity>
                <Image source={{ uri:items?.photo }} style={{ width: 32, aspectRatio: 1, borderRadius: 32 }} />
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 20, color: COLORS.black, fontWeight: "600", width: 180 }} numberOfLines={1}>
                        {items?.displayName}
                    </Text>
                </View>
                <TouchableOpacity>
                    <MaterialCommunityIcons name='dots-horizontal-circle-outline' size={26} color={COLORS.black} />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, }}>
                <GiftedChat
                    placeholder='Nhập tin nhắn'
                    renderSend={renderSend}
                    renderMessageImage={renderImage}
                    isTyping={true}
                    messages={messageList}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: user._id,
                        avatar: user.photo,  
                    }}
                />
            </View>
        </SafeAreaView>

    )
}

export default ChatScreen;