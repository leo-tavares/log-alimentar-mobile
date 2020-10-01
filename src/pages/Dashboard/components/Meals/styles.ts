import {FlatList} from 'react-native';
import styled from 'styled-components/native';

//only in grams
interface MacronutrientsType {
  carbohydrates: number;
  protein: number;
  fat: number;
}

interface Calories {
  quantity: number;
  unit: 'kcal' | 'kj'; //default Kcal
}

interface MealItemType {
  name: string;
  quantity: number;
  unit: string;
  macronutrients: MacronutrientsType;
  calories: Calories;
}

export interface MealType {
  name: string;
  items: Array<MealItemType>;
  macronutrients: MacronutrientsType;
  calories: Calories;
}

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const MealList = styled(FlatList as new () => FlatList<MealType>)``;

export const Meal = styled.View`
  background: yellowgreen;
  margin: 8px;
  padding: 16px;
`;

export const MealTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const MealItems = styled(FlatList as new () => FlatList<MealItemType>)``;

export const MealItemDetail = styled.View`
  padding: 8px 0px;
  align-items: flex-start;
  justify-content: space-between;
`;

export const MealItemTitle = styled.Text``;

export const Macronutrients = styled.Text``;

export const MealSummary = styled.View`
  padding: 8px 0px;
  align-items: flex-start;
  justify-content: center;
`;

export const MealSummaryTitle = styled.Text`
  align-self: center;
  font-size: 16px;
`;
