import {Model} from '@nozbe/watermelondb';
import {
  action,
  children,
  date,
  field,
  readonly,
} from '@nozbe/watermelondb/decorators';
import {Associations} from '@nozbe/watermelondb/Model';
import MealItems from './MealItems';

interface addMealItem {
  name: string;
  quantity: number;
  quantity_unit: string;
  carbohydrate: number;
  protein: number;
  fat: number;
}

class Meal extends Model {
  static table = 'meals';
  static associations: Associations = {
    meal_items: {type: 'has_many', foreignKey: 'meal_item_id'},
  };

  @field('name')
  name!: string;

  @children('meal_items')
  meal_items!: any; //FIXME:

  @readonly()
  @date('created_at')
  created_at!: Date;

  @readonly()
  @date('updated_at')
  updated_at!: Date;

  @action async listMealItems() {
    const meal_items = this.meal_items.fetch();
    return meal_items;
  }

  @action async addMealItem({
    name,
    quantity,
    quantity_unit,
    carbohydrate,
    protein,
    fat,
  }: addMealItem) {
    const meal_item = this.collections.get<MealItems>('meal_items');
    const meal_items = await meal_item.create((mealItem) => {
      mealItem.meal.set(this);
      mealItem.name = name;
      mealItem.quantity = quantity;
      mealItem.quantity_unit = quantity_unit;
      mealItem.carbohydrate = carbohydrate;
      mealItem.protein = protein;
      mealItem.fat = fat;
    });
    return meal_items;
  }

  @action async addMealItems(mealItems: Array<addMealItem>) {
    const mealItemCollection = this.collections.get<MealItems>('meal_items');
    const mealItemsBatch = mealItems.map((mealItem) => {
      return mealItemCollection.prepareCreate((meal_item) => {
        meal_item.meal.set(this);
        meal_item.name = mealItem.name;
        meal_item.quantity = mealItem.quantity;
        meal_item.quantity_unit = mealItem.quantity_unit;
        meal_item.carbohydrate = mealItem.carbohydrate;
        meal_item.protein = mealItem.protein;
        meal_item.fat = mealItem.fat;
      });
    });
    await this.batch(...mealItemsBatch);
  }
}

export default Meal;
