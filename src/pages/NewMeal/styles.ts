import {FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import {Form as Unform} from '@unform/mobile';
import MealItemComponent from '../../components/MealItem';

export const Container = styled.View`
  flex: 1;
`;

export const ModalContent = styled.View`
  min-height: 250px;
  padding: 8px;
  border-radius: 20px;
  background: #f5f5f5;
  justify-content: space-between;
`;

export const MealTitleInput = styled.TextInput.attrs({
  placeholder: 'Nome da refeição',
})`
  align-self: center;
  text-align: center;
  font-size: 28px;
`;

export const FloatCloseButton = styled.TouchableOpacity`
  position: absolute;
  right: -10px;
  top: -10px;
`;

export const CloseIcon = styled(Icon).attrs({
  name: 'x',
  size: 32,
})`
  background: #7a7a7a;
  border-radius: 36px;
`;

export const MealItemsContainer = styled.View`
  margin: 0px 0px 4px;
`;

export const MealItems = styled(
  FlatList as new () => FlatList<typeof MealItemComponent>,
)``;

export const Form = styled(Unform)`
  max-height: 220px;
`;

export const MealItem = styled(MealItemComponent)``;

export const AddMoreMealItem = styled.TouchableOpacity`
  align-self: center;
`;

export const AddMoreMealItemIcon = styled(Icon).attrs({
  name: 'plus',
  size: 24,
})`
  text-align: center;
  background: #2b65ed;
  border-radius: 40px;
`;

export const Macronutrients = styled.Text``;

export const MealSummary = styled.View`
  background: #6a93f2;
  height: 40px;
  border-radius: 8px;
  margin: 0px 0px 4px;
  align-items: center;
  justify-content: center;
`;

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
  height: 180px;
  width: 80%;
`;

export const DoneBtn = styled.TouchableOpacity`
  background: #2b65ed;
  height: 40px;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
`;

export const DoneBtnText = styled.Text`
  align-self: center;
  font-size: 24px;
`;
