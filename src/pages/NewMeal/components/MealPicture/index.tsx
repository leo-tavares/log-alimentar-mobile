import React, {useCallback, useState} from 'react';
import {
  Camera,
  CameraContainer,
  ReplaceButton,
  MealPicture,
  TextCamera,
  ReplaceIcon,
} from './styles';
import ImagePicker, {
  Options as CameraOptions,
} from 'react-native-image-crop-picker';
import {PixelRatio, Platform} from 'react-native';

const Picture: React.FC = () => {
  const [uri, setUri] = useState('');
  const cameraOptions: CameraOptions = {
    width: PixelRatio.getPixelSizeForLayoutSize(120),
    height: PixelRatio.getPixelSizeForLayoutSize(60),
    cropping: true,
    cropperToolbarTitle:
      'faça alguns ajustes para registrar esse momento \u{1F606}',
    mediaType: 'photo',
    compressImageQuality: 0.8,
    includeBase64: true,
    writeTempFile: false, //only work in ios
  };

  const takePicture = useCallback(async () => {
    try {
      const image = await ImagePicker.openCamera(cameraOptions);
      setUri(`data:${image.mime};base64,${image.data}`);
      if (Platform.OS === 'android') {
        await ImagePicker.cleanSingle(image.path);
      }
    } catch (error) {
      setUri('');
    }
  }, [cameraOptions]);

  const replacePictureCb = useCallback(async () => {
    setUri('');
    await takePicture();
  }, [takePicture]);

  return (
    <CameraContainer>
      {!uri && (
        <Camera onPress={takePicture}>
          <TextCamera>Que tal registrar uma foto desse momento?</TextCamera>
        </Camera>
      )}
      {!!uri && (
        <>
          <MealPicture
            source={{uri}}
            resizeMode={'cover'}
            resizeMethod={'scale'}
          />
          <ReplaceButton onPress={replacePictureCb}>
            <ReplaceIcon />
          </ReplaceButton>
        </>
      )}
    </CameraContainer>
  );
};

export default React.memo(Picture);
