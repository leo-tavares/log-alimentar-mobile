import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {
  CloseIcon,
  Container,
  DoneBtn,
  DoneBtnText,
  ModalContent,
  FloatCloseButton,
  MealTitleInput,
  MealItems,
  MealItem,
  AddMoreMealItem,
  AddMoreMealItemIcon,
  MealItemsContainer,
  MealItemName,
  MealItemMacronutrients,
} from './styles';

const NewMeal: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();

  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate('Dashboard');
  };

  const NewMealItem: React.FC = () => (
    <MealItem>
      <MealItemName>{`100g arroz ${Date.now()}`}</MealItemName>
      <MealItemMacronutrients>
        {'carb: 40g prot: 15g gord: 5g cal: 265kcal'}
      </MealItemMacronutrients>
    </MealItem>
  );

  const [mealItems, setMealItems] = useState([NewMealItem]);
  return (
    <Container>
      <Modal isVisible={isModalVisible}>
        <ModalContent>
          <MealTitleInput />
          <FloatCloseButton onPress={closeModal}>
            <CloseIcon />
          </FloatCloseButton>
          <MealItemsContainer>
            <MealItems
              data={mealItems}
              keyExtractor={(_, idx) => idx.toString()}
              renderItem={({item: Item}) => <Item />}
              inverted={true}
            />
            <AddMoreMealItem
              onPress={() => setMealItems([...mealItems, NewMealItem])}>
              <AddMoreMealItemIcon />
            </AddMoreMealItem>
          </MealItemsContainer>
          <DoneBtn>
            <DoneBtnText>Done</DoneBtnText>
          </DoneBtn>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default NewMeal;
