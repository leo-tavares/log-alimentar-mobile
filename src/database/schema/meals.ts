import {tableSchema} from '@nozbe/watermelondb';

const Meal = tableSchema({
  name: 'meals',
  columns: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'picture',
      type: 'string',
      isOptional: true,
    },
    {
      name: 'meal_item_id',
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

export default Meal;
