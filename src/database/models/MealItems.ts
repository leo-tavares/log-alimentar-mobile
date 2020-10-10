import {Model} from '@nozbe/watermelondb';
import {Associations} from '@nozbe/watermelondb/Model';
import {date, field, readonly, relation} from '@nozbe/watermelondb/decorators';

class MealItems extends Model {
  static table = 'meal_items';
  static associations: Associations = {
    meals: {type: 'belongs_to', key: 'meal_id'},
  };

  @field('name')
  name!: string;

  @field('quantity')
  quantity!: number;

  @field('quantity_unit')
  quantity_unit!: string;

  @field('protein')
  protein!: number;

  @field('carbohydrate')
  carbohydrate!: number;

  @field('fat')
  fat!: number;

  @relation('meals', 'meal_id')
  meal: any; //FIXME:

  @readonly()
  @date('created_at')
  createdAt!: Date;

  @readonly()
  @date('updated_at')
  updatedAt!: Date;
}

export default MealItems;
