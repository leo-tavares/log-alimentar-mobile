import React, {createContext, useContext, useEffect, useState} from 'react';
import {useDatabase} from '@nozbe/watermelondb/hooks';
import MealModel from '../database/models/Meal';
import {Q} from '@nozbe/watermelondb';
import {subDays} from 'date-fns';
import MealItems from '../database/models/MealItems';
import {map} from 'ramda';

//only in grams
interface Macronutrients {
  carbohydrate: number;
  protein: number;
  fat: number;
}

interface Calories {
  quantity: number;
  unit: 'kcal' | 'kj'; //default Kcal. Kcal no DB converto no front caso necessário
}

interface MealItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  macronutrients: Macronutrients;
  calories: Calories; // info detivada dos macronutrientes
}

interface Meal {
  id: string;
  name: string;
  items: Array<MealItem>;
  macronutrients: Macronutrients; // info derivada dos items
  calories: Calories; // info detivada dos macronutrientes
}

interface AddMealItemDB {
  name: string;
  quantity: number;
  quantity_unit: string;
  carbohydrate: number;
  protein: number;
  fat: number;
}

type PreFormattedMeals = Array<Omit<Meal, 'calories' | 'macronutrients'>>;

type Meals = Array<Meal>;

type MealsContextData = {
  meals: Meals;
  addMeal: (meal: Omit<Meal, 'id'>) => void;
  // removeMeal: (mealIdx: number) => void; //embreve mealId após a integração com watermallonDB
  // updateMeal: (mealIdx: number) => void; //embreve mealId após a integração com watermallonDB
  // addMealItem: (itemIdx: number) => void; //embreve mealId após a integração com watermallonDB
  // removeMealItem: (itemIdx: number) => void; //embreve mealId após a integração com watermallonDB
};

const MealsContext = createContext<MealsContextData>({} as MealsContextData);

const MealsProvider: React.FC = ({children}) => {
  const database = useDatabase();
  const [meals, setMeals] = useState<Meals>([]);

  useEffect(() => {
    const loadMeals = async () => {
      const mealsRecord = await database.collections
        .get<MealModel>('meals')
        .query(
          Q.where('created_at', Q.gte(subDays(Date.now(), 7).getTime())),
          Q.experimentalSortBy('created_at', Q.desc),
          Q.experimentalTake(10),
        )
        .fetch();
      //lazy load mealItems
      const preFormattedMeals: PreFormattedMeals = await Promise.all(
        mealsRecord.map(async (meal) => ({
          id: meal.id,
          name: meal.name,
          items: (await meal.meal_items.fetch()).map(
            (mealItem: MealItems): MealItem => {
              const {
                id,
                name,
                quantity,
                quantity_unit: unit,
                carbohydrate,
                protein,
                fat,
              } = mealItem;
              const caloriesQty = (carbohydrate + protein) * 4 + fat * 9;
              return {
                id,
                name,
                quantity,
                unit,
                macronutrients: {
                  carbohydrate,
                  protein,
                  fat,
                },
                calories: {
                  quantity: caloriesQty,
                  unit: 'kcal',
                },
              };
            },
          ),
        })),
      );

      const formattedMeals: Meals = preFormattedMeals.map((m) => {
        type MacroAndCalories = {
          macronutrients: Macronutrients;
          calories: Pick<Calories, 'quantity'>;
        };
        const macroAndCalories: MacroAndCalories = m.items.reduce(
          (
            acc,
            {
              macronutrients: {carbohydrate, protein, fat},
              calories: {quantity},
            },
          ) => {
            const {
              macronutrients: {
                carbohydrate: accCarb,
                protein: accProt,
                fat: accFat,
              },
            } = acc;
            return {
              macronutrients: {
                carbohydrate: accCarb + carbohydrate,
                protein: accProt + protein,
                fat: accFat + fat,
              },
              calories: {
                quantity: acc.calories.quantity + quantity,
              },
            };
          },
          {
            //initial value
            macronutrients: {
              carbohydrate: 0,
              protein: 0,
              fat: 0,
            },
            calories: {
              quantity: 0,
            },
          },
        );
        return {
          id: m.id,
          name: m.name,
          items: m.items,
          macronutrients: macroAndCalories.macronutrients,
          calories: {
            quantity: macroAndCalories.calories.quantity,
            unit: 'kcal',
          },
        };
      });

      setMeals(formattedMeals);
    };
    loadMeals();
  }, [database.collections]);

  const addMeal = async (meal: Omit<Meal, 'id'>) => {
    const mealCollection = database.collections.get<MealModel>('meals');

    await database.action(async () => {
      const newMeal = await mealCollection.create((mealRecord) => {
        mealRecord.name = meal.name;
      });
      await newMeal.subAction(() => {
        const mealItemDB = map<MealItem, AddMealItemDB>(
          ({name, macronutrients, quantity, unit}) => ({
            name,
            quantity: Number(quantity),
            quantity_unit: unit,
            carbohydrate: Number(macronutrients.carbohydrate),
            protein: Number(macronutrients.protein),
            fat: Number(macronutrients.fat),
          }),
          meal.items,
        );

        return newMeal.addMealItems(mealItemDB);
      });
    });

    setMeals([...meals, meal]);
  };

  return (
    <MealsContext.Provider value={{meals, addMeal}}>
      {children}
    </MealsContext.Provider>
  );
};

const useMeals = (): MealsContextData => {
  const context = useContext(MealsContext);
  if (!context) {
    throw new Error('useMeals must be used within a MealsProvider');
  }
  return context;
};

export {useMeals, MealsProvider};
