import React, {useCallback, useMemo, useState} from 'react';
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
import {useNewMeal} from '../../../../hooks/newMeal';

const Picture: React.FC = () => {
  const [uri, setUri] = useState('');
  const {addMealPicture} = useNewMeal();

  const takePicture = useCallback(async () => {
    try {
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
      const image = await ImagePicker.openCamera(cameraOptions);
      const _uri = `data:${image.mime};base64,${image.data}`;
      addMealPicture(_uri);
      setUri(_uri);
      if (Platform.OS === 'android') {
        await ImagePicker.cleanSingle(image.path);
      }
    } catch (error) {
      setUri('');
    }
  }, [addMealPicture]);

  const replacePicture = useCallback(async () => {
    setUri('');
    await takePicture();
  }, [takePicture]);

  return useMemo(
    () => (
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
            <ReplaceButton onPress={replacePicture}>
              <ReplaceIcon />
            </ReplaceButton>
          </>
        )}
      </CameraContainer>
    ),
    [replacePicture, takePicture, uri],
  );
};

export default Picture;
