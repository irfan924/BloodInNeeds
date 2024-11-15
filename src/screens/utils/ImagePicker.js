import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export const handleCameraPicker = async (setFilePath) => {
    try {
        const imagePickerResponse = await ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        });

        if (imagePickerResponse) {
            const uploadUri = imagePickerResponse.path;
            const fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

            setFilePath(fileName)
        }else{
            return Alert.alert('Selection Faild!')
        }
    } catch (error) {
        Alert.alert('Error opening image picker:', error);
        Alert.alert('Error', 'Something went wrong while opening the camera.');
    }
};

export const handleGalleryPicker = async (setFilePath) => {
    try {
        const imagePickerResponse = await ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        });


        if (imagePickerResponse) {
            const uploadUri = imagePickerResponse.path;
            const fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

            setFilePath(fileName)
        }else{
            return Alert.alert('Selection Faild!')
        }
    } catch (error) {
        console.error('Error opening image picker:', error);
        Alert.alert('Error', 'Something went wrong while opening the camera.');
    }
};
