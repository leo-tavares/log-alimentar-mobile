import React from 'react';
import {useMeals} from '../../../../hooks/meals';
import {
  Container,
  MealList,
  MealItems,
  MealTitle,
  MealItemTitle,
  Meal,
  Macronutrients,
  MealItemDetail,
  MealSummary,
  MealSummaryTitle,
} from './styles';

const Meals: React.FC = () => {
  const {meals} = useMeals();
  return (
    <Container>
      <MealList
        keyExtractor={(meal) => meal.id}
        data={meals}
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
                    {`carb: ${mealItem.macronutrients.carbohydrate}g prot: ${mealItem.macronutrients.protein}g gord: ${mealItem.macronutrients.fat}g cal: ${mealItem.calories.quantity}${mealItem.calories.unit}`}
                  </Macronutrients>
                </MealItemDetail>
              )}
            />
            <MealSummary>
              <MealSummaryTitle>Resumo da refeição</MealSummaryTitle>
              <Macronutrients>
                {`carb: ${meal.macronutrients.carbohydrate}g prot: ${meal.macronutrients.protein}g gord: ${meal.macronutrients.fat}g cal: ${meal.calories.quantity}${meal.calories.unit}`}
              </Macronutrients>
            </MealSummary>
          </Meal>
        )}
      />
    </Container>
  );
};

export default Meals;
