import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import MealItemsComponent from './components/MealItems';

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
  maxLength: 20,
  placeholder: 'Nome da refeição',
})`
  max-width: 80%;
  align-self: center;
  text-align: center;
  font-size: 28px;
  text-align: center;
`;

export const FloatCloseButton = styled.TouchableOpacity`
  position: absolute;
  height: 40px;
  width: 40px;
  border-radius: 40px;
  background-color: #7a7a7a;
  justify-content: center;
  align-items: center;
  right: -10px;
  top: -10px;
`;

export const CloseIcon = styled(Icon).attrs({
  name: 'x',
  size: 32,
})`
  background: transparent;
`;

export const MealItemsContainer = styled.View`
  margin: 0px 0px 4px;
`;

export const MealItems = styled(MealItemsComponent)``;

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
