import React, {useCallback, useState} from 'react';
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
} from './styles';
import {useNewMeal} from '../../hooks/newMeal';
import {useMeals} from '../../hooks/meals';
import MealPicture from './components/MealPicture';
import MealSummary from './components/MealSummary';

const NewMeal: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(true);

  const navigation = useNavigation();
  const {addMealName, resetNewMeal, meal} = useNewMeal();
  const {addMeal} = useMeals();

  const closeModal = useCallback(() => {
    setModalVisible(false);
    resetNewMeal();
    navigation.navigate('Dashboard');
  }, [navigation, resetNewMeal]);

  const doneCallback = useCallback(() => {
    addMeal(meal); //FIXME: interoperability of types, typescript issue
    closeModal();
  }, [addMeal, closeModal, meal]);

  const handleMealItems = (title: string) => addMealName(title);

  return (
    <Container>
      <Modal isVisible={isModalVisible}>
        <ModalContent>
          <MealTitleInput multiline onChangeText={handleMealItems} />
          <FloatCloseButton onPress={closeModal}>
            <CloseIcon />
          </FloatCloseButton>
          <MealItems />
          <MealSummary />
          <MealPicture />
          <DoneBtn onPress={doneCallback}>
            <DoneBtnText>Done</DoneBtnText>
          </DoneBtn>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default NewMeal;
