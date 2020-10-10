import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {Platform} from 'react-native';

import schema from './models/schema';
import MealItems from './models/MealItems';
import Meal from './models/Meal';

const adapter = new SQLiteAdapter({
  schema,
  dbName: 'log-alimentar',
  synchronous: Platform.OS === 'ios' ? true : false,
});

const database = new Database({
  adapter,
  modelClasses: [Meal, MealItems],
  actionsEnabled: true,
});

export default database;
