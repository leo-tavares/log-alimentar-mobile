import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {MealItem as MealItemType} from '../../hooks/newMeal';
import {
  Container,
  Description,
  Quantity,
  Name,
  MacronutrientsAndCalories,
  Carbohydrate,
  Protein,
  Fat,
  Calories,
  FloatCloseButton,
  CloseIcon,
} from './styles';

interface Props {
  removeItemCb: (arg0: any) => void;
  updateItemCb: (optionalProperty: Partial<MealItemType>) => void;
  item: MealItemType;
}
const MealItem: React.FC<Props> = ({
  item,
  removeItemCb = () => {},
  updateItemCb = () => {},
}) => {
  const [calories, setCalories] = useState<string>('');
  const {quantity, name: itemName, macronutrients} = item;
  const {carbohydrate, protein, fat} = macronutrients;

  useEffect(() => {
    const partialCalories =
      (Number(carbohydrate) + Number(protein)) * 4 + Number(fat) * 9;
    setCalories(String(partialCalories || ''));
  }, [carbohydrate, fat, protein]);

  const inputLimit = 3;
  console.log('render');

  return (
    <Container>
      <FloatCloseButton onPress={removeItemCb}>
        <CloseIcon />
      </FloatCloseButton>
      <Description>
        <Quantity
          value={String(quantity)}
          placeholder={'Quantidade'}
          onChangeText={(qtd) => {
            updateItemCb({...item, quantity: qtd});
          }}
          keyboardType={'numeric'}
          maxLength={inputLimit}
        />
        <Text>g</Text>

        <Name
          value={itemName}
          autoCapitalize={'none'}
          onChangeText={(name) => updateItemCb({...item, name})}
          numberOfLines={2}
          multiline={true}
          maxLength={150}
          placeholder={'nome do item'}
        />
      </Description>
      <MacronutrientsAndCalories>
        <Carbohydrate
          value={String(macronutrients.carbohydrate)}
          onChangeText={(carb) =>
            updateItemCb({
              ...item,
              macronutrients: {
                ...item.macronutrients,
                carbohydrate: carb,
              },
            })
          }
          returnKeyType={'next'}
          keyboardType={'numeric'}
          placeholder={'carb'}
          maxLength={inputLimit}
        />
        <Text>g</Text>

        <Protein
          value={String(macronutrients.protein)}
          onChangeText={(prot) =>
            updateItemCb({
              ...item,
              macronutrients: {
                ...item.macronutrients,
                protein: prot,
              },
            })
          }
          keyboardType={'numeric'}
          placeholder={'prot'}
          maxLength={inputLimit}
        />
        <Text>g</Text>

        <Fat
          value={String(macronutrients.fat)}
          onChangeText={(fat) =>
            updateItemCb({
              ...item,
              macronutrients: {
                ...item.macronutrients,
                fat,
              },
            })
          }
          keyboardType={'numeric'}
          placeholder={'gord'}
          maxLength={inputLimit}
        />
        <Text>g</Text>

        <Calories>{`${calories} kcal`}</Calories>
      </MacronutrientsAndCalories>
    </Container>
  );
};

export default React.memo(MealItem);
