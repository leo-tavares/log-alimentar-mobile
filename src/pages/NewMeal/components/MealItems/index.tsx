import React from 'react';
import {MealItem as MealItemType, useNewMeal} from '../../../../hooks/newMeal';
import {
  Container,
  MealItem,
  MealItemList,
  AddMoreMealItem,
  AddMoreMealItemIcon,
} from './styles';

const MealItems: React.FC = () => {
  const {
    meal: {items},
    removeMealItem,
    addMealItem,
    updateMealItem,
  } = useNewMeal();

  const renderItem = ({index, item}: {index: number; item: MealItemType}) => {
    const removeItem = () => removeMealItem(index);
    const updateItem = (optionalProperty: Partial<MealItemType>) => {
      updateMealItem(index, {...optionalProperty});
    };
    return (
      <MealItem
        removeItemCb={removeItem}
        updateItemCb={updateItem}
        item={item}
      />
    );
  };

  const keyExtractor = (_: MealItemType, idx: Number) => idx.toString();

  return (
    <Container>
      <MealItemList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
      <AddMoreMealItem onPress={addMealItem}>
        <AddMoreMealItemIcon />
      </AddMoreMealItem>
    </Container>
  );
};

export default React.memo(MealItems);
