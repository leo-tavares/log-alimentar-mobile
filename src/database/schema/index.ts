import {appSchema} from '@nozbe/watermelondb';
import MealItems from './mealItem';
import MealSchema from './meals';

const Schema = appSchema({
  version: 1,
  tables: [MealSchema, MealItems],
});

export default Schema;
