import React from 'react';
import Header from './components/Header';
import Meals from './components/Meals';
import {Container} from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header />
      <Meals />
    </Container>
  );
};

export default Dashboard;
