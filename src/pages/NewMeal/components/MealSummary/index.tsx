import {reduce} from 'ramda';
import React, {useEffect, useMemo, useState} from 'react';
import {MealItem, useNewMeal} from '../../../../hooks/newMeal';
import {Container, Macronutrients} from './styles';

interface MacroAndCalories {
  carbohydrate: number;
  protein: number;
  fat: number;
  calories: number;
}

const MealSummary: React.FC = () => {
  const [macroAndCalories, setMacroAndCalories] = useState<MacroAndCalories>({
    carbohydrate: 0,
    protein: 0,
    fat: 0,
    calories: 0,
  });
  const {meal} = useNewMeal();
  useEffect(() => {
    const {items} = meal;
    const accMacroAndCalories = reduce<MealItem, MacroAndCalories>(
      (acc, item) => {
        const {
          macronutrients: {carbohydrate, protein, fat},
        } = item;
        const numericCarb = Number(carbohydrate);
        const numericProt = Number(protein);
        const numericFat = Number(fat);
        const currentCalories =
          (numericCarb + numericProt) * 4 + numericFat * 9;
        const accCalories = acc.calories + currentCalories;
        return {
          carbohydrate: acc.carbohydrate + numericCarb,
          protein: acc.protein + numericProt,
          fat: acc.fat + numericFat,
          calories: accCalories,
        };
      },
      {
        carbohydrate: 0,
        protein: 0,
        fat: 0,
        calories: 0,
      },
      items,
    );
    setMacroAndCalories(accMacroAndCalories);
  }, [meal]);
  const {calories, carbohydrate, protein, fat} = macroAndCalories;
  return useMemo(
    () => (
      <Container>
        <Macronutrients>
          {`Total: carb: ${carbohydrate}g prot: ${protein}g gord: ${fat}g cal: ${calories}kcal`}
        </Macronutrients>
      </Container>
    ),
    [calories, carbohydrate, fat, protein],
  );
};

export default MealSummary;
