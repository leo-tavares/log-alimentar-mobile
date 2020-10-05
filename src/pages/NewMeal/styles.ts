import {FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

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
  font-size: 36px;
`;

export const FloatCloseButton = styled.TouchableOpacity`
  position: absolute;
  right: -12px;
  top: -12px;
`;

export const CloseIcon = styled(Icon).attrs({
  name: 'x',
  size: 36,
})`
  background: #7a7a7a;
  border-radius: 36px;
`;

export const MealItemsContainer = styled.View`
  max-height: 300px;
  padding: 8px;
`;

export const MealItems = styled(FlatList as new () => FlatList)``;

export const MealItem = styled.View`
  margin: 2px 0px 8px 0px;
`;

export const MealItemName = styled.Text``;

export const MealItemMacronutrients = styled.Text``;

export const AddMoreMealItem = styled.TouchableOpacity`
  margin-bottom: 8px;
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

export const DoneBtn = styled.TouchableOpacity`
  background: #2b65ed;
  height: 48px;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
`;

export const DoneBtnText = styled.Text`
  align-self: center;
  font-size: 24px;
`;
