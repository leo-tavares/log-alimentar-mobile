import {FlatList} from 'react-native';
import MealItemComponent from '../../../../components/MealItem';
import {MealItem as MealItemType} from '../../../../hooks/newMeal';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  margin-bottom: 8px;
`;

export const MealItemList = styled(
  FlatList as new () => FlatList<MealItemType>,
)`
  max-height: 230px;
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
