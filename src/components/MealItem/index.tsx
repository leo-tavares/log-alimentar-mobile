import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
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
  idx: number;
  removeItemCb?: (arg0: any) => any;
}

interface MacronutrientsType {
  carbohydrate: number;
  fat: number;
  protein: number;
}

const inputLimit = 3;

const MealItem: React.FC<Props> = ({idx, removeItemCb = () => {}}) => {
  const [calories, setCalories] = useState<number>();
  const [macronutrients, setMacronutrients] = useState<MacronutrientsType>({
    carbohydrate: 0,
    protein: 0,
    fat: 0,
  });

  useEffect(() => {
    const {carbohydrate, protein, fat} = macronutrients;
    setCalories((carbohydrate + protein) * 4 + fat * 9);
  }, [macronutrients]);

  return (
    <Container>
      <FloatCloseButton onPress={removeItemCb}>
        <CloseIcon />
      </FloatCloseButton>
      <Description>
        <Quantity
          name={`quantity-${idx}`}
          maxLength={inputLimit}
          placeholder={'Quantidade'}
        />
        <Text>g</Text>
        <Name name={`name-${idx}`} placeholder={'nome do item'} />
      </Description>
      <MacronutrientsAndCalories>
        <Carbohydrate
          name={`carbohydrate-${idx}`}
          keyboardType={'numeric'}
          placeholder={'carb'}
          maxLength={inputLimit}
          getValue={(carbohydrate) => {
            setMacronutrients({
              ...macronutrients,
              carbohydrate: Number(carbohydrate),
            });
          }}
        />
        <Text>g</Text>

        <Protein
          name={`protein-${idx}`}
          keyboardType={'numeric'}
          placeholder={'prot'}
          maxLength={inputLimit}
          getValue={(protein) => {
            setMacronutrients({
              ...macronutrients,
              protein: Number(protein),
            });
          }}
        />
        <Text>g</Text>

        <Fat
          name={`fat-${idx}`}
          keyboardType={'numeric'}
          placeholder={'gord'}
          maxLength={inputLimit}
          getValue={(fat) => {
            setMacronutrients({
              ...macronutrients,
              fat: Number(fat),
            });
          }}
        />
        <Text>g</Text>

        <Calories>{`${calories} kcal`}</Calories>
      </MacronutrientsAndCalories>
    </Container>
  );
};

export default MealItem;
