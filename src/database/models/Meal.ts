import {Model} from '@nozbe/watermelondb';
import {children, date, field, readonly} from '@nozbe/watermelondb/decorators';
import {Associations} from '@nozbe/watermelondb/Model';

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
}

export default Meal;
