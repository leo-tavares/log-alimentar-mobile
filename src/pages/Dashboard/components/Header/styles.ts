import styled, {css} from 'styled-components/native';
import {Grid as EasyGrid, Col as EasyCol} from 'react-native-easy-grid';

interface DiffProps {
  sign: number;
}

export const Container = styled.View`
  margin: 0px 0px 8px 0px;
  padding: 8px 8px 0px 8px;
  height: 144px;
  background: #b5161622;
`;

export const Grid = styled(EasyGrid)``;

export const Col = styled(EasyCol)`
  margin: 8px;
  justify-content: space-evenly;
`;

export const GoalOfTheDay = styled.Text`
  font-size: 16px;
  align-self: center;
  font-weight: bold;
`;

export const Goal = styled.Text``;

export const Current = styled.Text``;

export const Diff = styled.Text<DiffProps>`
  ${({sign}) => {
    return sign >= 0
      ? css`
          color: green;
        `
      : css`
          color: 'rgb(255,10,10)';
        `;
  }}
`;
