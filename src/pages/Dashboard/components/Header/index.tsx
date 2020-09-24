import React from 'react';
import {Text} from 'react-native';
import {
  Container,
  Current,
  Diff,
  Goal,
  Grid,
  Col,
  GoalOfTheDay,
} from './styles';

const Header: React.FC = () => {
  const macronutrientScale = 'g';
  const calScale = 'kcal';
  const diff = 350 - 100; // cada macronutriente tem a sua própria diferença
  return (
    <Container>
      <GoalOfTheDay>Objetivos do dia!</GoalOfTheDay>
      <Grid>
        <Col size={1.5}>
          <Text>Macros</Text>
          <Text>{`Carboidratos(${macronutrientScale})`}</Text>
          <Text>{`Proteínas(${macronutrientScale})`}</Text>
          <Text>{`Gorduras(${macronutrientScale})`}</Text>
          <Text>{`Calorias(${calScale})`}</Text>
        </Col>

        <Col>
          <Text>Meta</Text>
          <Goal>{`${350}`}</Goal>
          <Goal>{`${200}`}</Goal>
          <Goal>{`${70}`}</Goal>
          <Goal>{`${2830}`}</Goal>
        </Col>

        <Col>
          <Text>Atual</Text>
          <Current>{`${180}`}</Current>
          <Current>{`${220}`}</Current>
          <Current>{`${35}`}</Current>
          <Current>{`${1915}`}</Current>
        </Col>

        <Col>
          <Text>Diferença</Text>
          <Diff sign={diff}>{`- ${170}`}</Diff>
          <Diff sign={200 - 220}>{`+ ${20}`}</Diff>
          <Diff sign={diff}>{`- ${35}`}</Diff>
          <Diff sign={diff}>{`- ${915}`}</Diff>
        </Col>
      </Grid>
    </Container>
  );
};

export default Header;
