import React, {useCallback, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FormHandles} from '@unform/core';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
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
  Form,
  MealSummary,
  Macronutrients,
  Camera,
  CameraContainer,
  TextCamera,
  MealPicture,
} from './styles';
import {useNewMeal} from '../../hooks/newMeal';

const NewMeal: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(true);
  const [mealPicture, setMealPicture] = useState<string>('');
  const [mealItems, setMealItems] = useState([MealItem]);
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const {addMealName, resetNewMeal} = useNewMeal();

  const closeModal = useCallback(() => {
    setModalVisible(false);
    resetNewMeal();
    navigation.navigate('Dashboard');
  }, [navigation, resetNewMeal]);

  const addMoreItem = useCallback(() => {
    if (mealItems.length >= 10) {
      return;
    } else {
      setMealItems([...mealItems, MealItem]);
    }
  }, [mealItems]);

  const handleMealItems = useCallback((data) => {
    console.log(data);
  }, []);

  const handleRemoveItem = useCallback(
    (idx: number) => {
      if (mealItems.length <= 1) {
        return;
      }
      setMealItems((oldMealItems) => [
        ...oldMealItems.slice(0, idx),
        ...oldMealItems.slice(idx + 1),
      ]);
    },
    [mealItems.length],
  );

  return (
    <Container>
      <Modal isVisible={isModalVisible}>
        <ModalContent>
          <MealTitleInput
            multiline
            onChangeText={(name) => addMealName(name)}
          />
          <FloatCloseButton onPress={closeModal}>
            <CloseIcon />
          </FloatCloseButton>

          <MealItemsContainer>
            <Form ref={formRef} onSubmit={handleMealItems}>
              <MealItems
                data={mealItems}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({item: Item, index}) => (
                  <Item
                    idx={index}
                    removeItemCb={() => handleRemoveItem(index)}
                  />
                )}
              />
            </Form>
            <AddMoreMealItem onPress={addMoreItem}>
              <AddMoreMealItemIcon />
            </AddMoreMealItem>
          </MealItemsContainer>
          <MealSummary>
            <Macronutrients>
              {'Total: carb: 100g prot: 150g gord: 40g cal: 1360kcal'}
            </Macronutrients>
          </MealSummary>
          <CameraContainer>
            {!mealPicture && (
              <Camera
                onPress={async () => {
                  const image = await ImagePicker.openCamera({
                    width: 300,
                    height: 400,
                    cropping: true,
                  });
                  setMealPicture(image.path);
                }}>
                <TextCamera>
                  Que tal registrar uma foto desse momento?
                </TextCamera>
              </Camera>
            )}
            {!!mealPicture && (
              <MealPicture
                source={{uri: mealPicture}}
                resizeMode={'cover'}
                resizeMethod={'resize'}
              />
            )}
          </CameraContainer>
          <DoneBtn onPress={() => formRef.current?.submitForm()}>
            <DoneBtnText>Done</DoneBtnText>
          </DoneBtn>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default NewMeal;
