import {tableSchema} from '@nozbe/watermelondb';

const MealItems = tableSchema({
  name: 'meal_items',
  columns: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'quantity',
      type: 'number',
    },
    {
      name: 'quantity_unit',
      type: 'string',
    },
    {
      name: 'protein',
      type: 'number',
    },
    {
      name: 'carbohydrate',
      type: 'number',
    },
    {
      name: 'fat',
      type: 'number',
    },
    {
      name: 'meal_id',
      type: 'string',
      isIndexed: true,
    },
    {
      name: 'created_at',
      type: 'number',
    },
    {
      name: 'updated_at',
      type: 'number',
    },
  ],
});

export default MealItems;
