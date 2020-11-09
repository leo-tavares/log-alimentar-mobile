import {PixelRatio} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

export const CameraContainer = styled.View``;

export const Camera = styled.TouchableOpacity`
  margin: 8px 0px;
  align-self: center;
  justify-content: flex-end;
  align-items: center;
`;

export const TextCamera = styled.Text``;

export const MealPicture = styled.Image`
  margin: 8px;
  border-radius: 8px;
  align-self: center;
  height: ${PixelRatio.getPixelSizeForLayoutSize(60)}px;
  width: ${PixelRatio.getPixelSizeForLayoutSize(120)}px;
`;

export const ReplaceButton = styled.TouchableOpacity`
  position: absolute;
  height: 32px;
  width: 32px;
  border-radius: 32px;
  background-color: #777777dd;
  justify-content: center;
  align-items: center;
  right: 4px;
  top: 0px;
`;

export const ReplaceIcon = styled(Icon).attrs({
  name: 'rotate-cw',
  size: 20,
})`
  background: transparent;
`;
