import React, {createContext, useContext, useState} from 'react';
import R from 'ramda';
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
  name: string;
  quantity: number;
  unit: string;
  macronutrients: Macronutrients;
  calories: Calories; // info detivada dos macronutrientes
}

interface Meal {
  name: string;
  items: Array<MealItem>;
  macronutrients: Macronutrients; // info derivada dos items
  calories: Calories; // info detivada dos macronutrientes
}

type MealContextData = {
  meal: Meal;
  addMeal: (meal: Meal) => void;
  addMealName: (name: string) => void;
  addMealItem: (mealItem: MealItem) => void;
  updateMealItem: (itemIdx: number, mealItem: Partial<MealItem>) => void;
  removeMealItem: (itemIdx: number) => void;
  resetNewMeal: () => void;
};

const NewMealContext = createContext<MealContextData>({} as MealContextData);

const NewMealProvider: React.FC = ({children}) => {
  const [meal, setMeal] = useState<Meal>({} as Meal);

  const addMeal = (newMeal: Meal) => {
    setMeal({...newMeal});
  };

  const addMealName = (name: string) => {
    setMeal(R.assoc('name', name, meal));
  };

  const addMealItem = (mealItem: MealItem) => {
    setMeal((oldMeal) => ({
      ...oldMeal,
      items: R.append(mealItem, oldMeal.items),
    }));
  };

  const updateMealItem = (
    itemIdx: number,
    optionalMealProperties: Partial<MealItem>,
  ) => {
    const itemsClone = R.clone(meal.items);
    const mealItem = itemsClone[itemIdx];
    if (!mealItem) {
      return;
    }
    const updatedItem = {
      ...mealItem,
      ...optionalMealProperties,
    };
    itemsClone[itemIdx] = updatedItem;

    setMeal((oldMeal) => ({
      ...oldMeal,
      items: R.clone(itemsClone),
    }));
  };

  const removeMealItem = (itemIdx: number) => {
    setMeal((oldMeal) => ({
      ...meal,
      items: R.remove(itemIdx, 1, oldMeal.items),
    }));
  };

  const resetNewMeal = () => {
    setMeal({} as Meal);
  };

  return (
    <NewMealContext.Provider
      value={{
        meal,
        addMeal,
        addMealName,
        addMealItem,
        updateMealItem,
        removeMealItem,
        resetNewMeal,
      }}>
      {children}
    </NewMealContext.Provider>
  );
};

const useNewMeal = (): MealContextData => {
  const context = useContext(NewMealContext);
  if (R.isEmpty(context)) {
    throw new Error('useNewMeal must bu use within a NewMealProvider');
  }
  return context;
};

export {useNewMeal, NewMealProvider};
