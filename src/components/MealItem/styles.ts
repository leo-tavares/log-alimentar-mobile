import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import Input from '../Input';

export const Container = styled.View`
  border: 0.2px;
  border-radius: 8px;
  margin: 0px 0px 8px;
`;

export const Description = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Quantity = styled(Input)`
  text-align: right;
`;

export const Name = styled(Input)``;

export const MacronutrientsAndCalories = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const MacronutrientsConteiner = styled.View``;

export const Carbohydrate = styled(Input)`
  margin: 0px 8px;
`;

export const Protein = styled(Input)`
  margin: 0px 8px;
`;

export const Fat = styled(Input)`
  margin: 0px 8px;
`;

export const Calories = styled.Text`
  margin: 0px 8px;
`; // informação derivada dos macronutrients

export const FloatCloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 4px;
  top: 4px;
`;

export const CloseIcon = styled(Icon).attrs({
  name: 'trash-2',
  size: 20,
})`
  padding: 4px;
  background: #df5555;
  border-radius: 36px;
`;
