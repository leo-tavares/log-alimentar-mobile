import React, {useCallback, useEffect, useRef} from 'react';
import {TextInputProps} from 'react-native';
import {useField} from '@unform/core';
import {Container, TextInput} from './styles';

interface InputProps extends TextInputProps {
  name: string;
  containerStyle?: object;
  getValue?: (value: string) => any;
}

interface InputValueReference {
  value: string;
}

const Input: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  getValue = () => {},
  ...rest
}) => {
  const {defaultValue = '', fieldName, registerField, error} = useField(name);
  const inputValueRef = useRef<InputValueReference>({value: defaultValue});
  const inputElementRef = useRef<any>(null);

  const updateValue = useCallback(
    (value) => {
      inputValueRef.current.value = value;
      getValue(value);
    },
    [getValue],
  );

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue: (_, value) => {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({text: value});
      },
      clearValue: () => {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle}>
      <TextInput
        ref={inputElementRef}
        defaultValue={defaultValue}
        onChangeText={updateValue}
        {...rest}
      />
    </Container>
  );
};

export default Input;
