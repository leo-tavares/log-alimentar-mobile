import React from 'react';
import {
  Container,
  MealList,
  MealItems,
  MealType,
  MealTitle,
  MealItemTitle,
  Meal,
  Macronutrients,
  MealItemDetail,
  MealSummary,
  MealSummaryTitle,
} from './styles';

const meals: Array<MealType> = [
  {
    name: 'Desjejum',
    items: [
      {
        name: 'arroz integral',
        quantity: 120,
        unit: 'g',
        macronutrients: {protein: 10, carbohydrates: 60, fat: 4},
        calories: {quantity: 500, unit: 'kcal'},
      },
      {
        name: 'frango grelhado',
        quantity: 200,
        unit: 'g',
        macronutrients: {protein: 10, carbohydrates: 60, fat: 4},
        calories: {quantity: 400, unit: 'kcal'},
      },
    ],
    macronutrients: {
      carbohydrates: 400,
      protein: 200,
      fat: 55,
    },
    calories: {
      quantity: 1500,
      unit: 'kcal',
    },
  },
  {
    name: 'Pré-treino',
    items: [
      {
        name: 'arroz integral',
        quantity: 120,
        unit: 'g',
        macronutrients: {protein: 10, carbohydrates: 60, fat: 4},
        calories: {quantity: 500, unit: 'kcal'},
      },
      {
        name: 'frango grelhado',
        quantity: 200,
        unit: 'g',
        macronutrients: {protein: 10, carbohydrates: 60, fat: 4},
        calories: {quantity: 400, unit: 'kcal'},
      },
    ],
    macronutrients: {
      carbohydrates: 400,
      protein: 200,
      fat: 55,
    },
    calories: {
      quantity: 1500,
      unit: 'kcal',
    },
  },
  {
    name: 'Almoço - pós treino',
    items: [
      {
        name: 'arroz integral',
        quantity: 120,
        unit: 'g',
        macronutrients: {protein: 10, carbohydrates: 60, fat: 4},
        calories: {quantity: 500, unit: 'kcal'},
      },
      {
        name: 'frango grelhado',
        quantity: 200,
        unit: 'g',
        macronutrients: {protein: 10, carbohydrates: 60, fat: 4},
        calories: {quantity: 400, unit: 'kcal'},
      },
      {
        name: 'azeite de oliva',
        quantity: 1,
        unit: 'col de sopa',
        macronutrients: {carbohydrates: 0, protein: 0, fat: 12},
        calories: {quantity: 108, unit: 'kcal'},
      },
    ],
    macronutrients: {
      carbohydrates: 400,
      protein: 200,
      fat: 55,
    },
    calories: {
      quantity: 1500,
      unit: 'kcal',
    },
  },
];

const Meals: React.FC = () => {
  const loadedMeals = meals; // from "api" || "watermelondb"
  return (
    <Container>
      <MealList
        keyExtractor={(_, idx) => idx.toString()}
        data={loadedMeals}
        renderItem={({item: meal}) => (
          <Meal>
            <MealTitle>{meal.name}</MealTitle>
            <MealItems
              keyExtractor={(_, idx) => idx.toString()}
              data={meal.items}
              renderItem={({item: mealItem}) => (
                <MealItemDetail>
                  <MealItemTitle>
                    {`${mealItem.quantity}${mealItem.unit} ${mealItem.name}`}
                  </MealItemTitle>
                  <Macronutrients>
                    {`carb: ${mealItem.macronutrients.carbohydrates}g prot: ${mealItem.macronutrients.protein}g gord: ${mealItem.macronutrients.fat}g cal: ${mealItem.calories.quantity}${mealItem.calories.unit}`}
                  </Macronutrients>
                </MealItemDetail>
              )}
            />
            <MealSummary>
              <MealSummaryTitle>Resumo da refeição</MealSummaryTitle>
              <Macronutrients>
                {`carb: ${meal.macronutrients.carbohydrates}g prot: ${meal.macronutrients.protein}g gord: ${meal.macronutrients.fat}g cal: ${meal.calories.quantity}${meal.calories.unit}`}
              </Macronutrients>
            </MealSummary>
          </Meal>
        )}
      />
    </Container>
  );
};

export default Meals;
