import React, {createContext, useContext, useState} from 'react';
import R, {assocPath, dissocPath} from 'ramda';
//only in grams
interface Macronutrients {
  carbohydrate: string;
  protein: string;
  fat: string;
}

interface Calories {
  quantity: string;
  unit: 'kcal' | 'kj'; //default Kcal. Kcal no DB converto no front caso necessário
}

export interface MealItem {
  name: string;
  quantity: string;
  unit: string;
  macronutrients: Macronutrients;
  calories: Calories; // info detivada dos macronutrientes
}

export interface Meal {
  name: string;
  items: Array<MealItem>;
  macronutrients: Macronutrients; // info derivada dos items
  calories: Calories; // info detivada dos macronutrientes
}

type MealContextData = {
  meal: Meal;
  addMeal: (meal: Meal) => void;
  addMealName: (name: string) => void;
  addMealItem: () => void;
  updateMealItem: (itemIdx: number, mealItem: Partial<MealItem>) => void;
  removeMealItem: (itemIdx: number) => void;
  resetNewMeal: () => void;
};

const NewMealContext = createContext<MealContextData>({} as MealContextData);

const defaultMealItem: MealItem = {
  name: '',
  quantity: '',
  unit: '',
  calories: {
    quantity: '',
    unit: 'kcal',
  },
  macronutrients: {
    carbohydrate: '',
    protein: '',
    fat: '',
  },
};
const defaultMeal: Meal = {
  name: '',
  items: [{...defaultMealItem}],
  calories: {
    quantity: '',
    unit: 'kcal',
  },
  macronutrients: {
    carbohydrate: '',
    protein: '',
    fat: '',
  },
};

const NewMealProvider: React.FC = ({children}) => {
  const [meal, setMeal] = useState<Meal>(defaultMeal);

  const addMeal = (newMeal: Meal) => {
    setMeal({...newMeal});
  };

  const addMealName = (name: string) => {
    setMeal(R.assoc('name', name, meal));
  };

  const addMealItem = () => {
    if (meal.items.length >= 10) {
      return;
    }
    setMeal({
      ...meal,
      items: [...meal.items, {...defaultMealItem}],
    });
  };

  const removeMealItem = (itemIdx: number) => {
    if (meal.items.length <= 1) {
      updateMealItem(0, defaultMealItem);
    } else {
      setMeal(dissocPath<Meal>(['items', itemIdx], meal));
    }
  };

  const resetNewMeal = () => {
    setMeal(defaultMeal);
  };

  const updateMealItem = (
    idx: number,
    optionalMealItemProperties: Partial<MealItem>,
  ) => {
    setMeal(assocPath(['items', idx], optionalMealItemProperties, meal));
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
