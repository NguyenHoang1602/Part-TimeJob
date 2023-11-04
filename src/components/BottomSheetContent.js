/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import COLORS from '../assets/const/colors';
import ImagePicker from 'react-native-image-crop-picker';

const BottomSheetContent = ({ isVisible, onClose }) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const openImagePicker = () => {
        ImagePicker.openPicker({
          multiple: true,
          mediaType: 'photo',
        })
          .then((images) => {
            setSelectedImages(images);
          })
          .catch((error) => {
            console.log(error);
          });
      };
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={{ justifyContent: 'flex-end', margin: 0 }}
    >
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
      </View>
      <View style={styles.panel}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.panelTitle}>Tải ảnh lên</Text>
          <Text style={styles.panelSubtitle}>Chọn hình ảnh nơi làm việc</Text>
        </View>
        <TouchableOpacity style={styles.panelButton} onPress={''}>
          <Text style={styles.panelButtonTitle}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelButton} onPress={''}>
          <Text style={styles.panelButtonTitle}>Chọn từ thư viện</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={onClose}>
          <Text style={styles.panelButtonTitle}>Hủy</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default BottomSheetContent;
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    commandButton: {
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#FF6347',
      alignItems: 'center',
      marginTop: 10,
    },
    panel: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      paddingTop: 20,
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,
      // shadowColor: '#000000',
      // shadowOffset: {width: 0, height: 0},
      // shadowRadius: 5,
      // shadowOpacity: 0.4,
    },
    header: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      // elevation: 5,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: COLORS.grey,
      marginBottom: 10,
    },
    panelTitle: {
      fontSize: 27,
      height: 35,
    },
    panelSubtitle: {
      fontSize: 14,
      color: COLORS.darkBlue,
      height: 30,
      marginBottom: 10,
      marginTop: 2,
    },
    panelButton: {
      padding: 13,
      borderRadius: 10,
      backgroundColor: '#3E7CEF',
      alignItems: 'center',
      marginVertical: 7,
    },
    panelButtonTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'white',
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
    actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
    },
  });