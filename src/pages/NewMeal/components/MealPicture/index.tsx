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
import {PixelRatio} from 'react-native';

const Picture: React.FC = () => {
  const [picture, setPicture] = useState('');
  const cameraOptions: CameraOptions = {
    width: PixelRatio.getPixelSizeForLayoutSize(120),
    height: PixelRatio.getPixelSizeForLayoutSize(60),
    cropping: true,
    cropperToolbarTitle:
      'faça alguns ajustes para registrar esse momento \u{1F606}',
    mediaType: 'photo',
  };

  const takePicture = useCallback(async () => {
    try {
      const image = await ImagePicker.openCamera(cameraOptions);
      setPicture(image.path);
    } catch (error) {
      setPicture('');
    }
  }, [cameraOptions]);

  const replacePictureCb = useCallback(async () => {
    await ImagePicker.cleanSingle(picture);
    setPicture('');
    await takePicture();
  }, [picture, takePicture]);

  return (
    <CameraContainer>
      {!picture && (
        <Camera onPress={takePicture}>
          <TextCamera>Que tal registrar uma foto desse momento?</TextCamera>
        </Camera>
      )}
      {!!picture && (
        <>
          <MealPicture
            source={{uri: picture}}
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
