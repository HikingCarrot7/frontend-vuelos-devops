import { Button } from '@chakra-ui/button';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import React, { useState } from 'react';

export interface ToggablePasswordViewInputProps {
  inputName: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
}

export const ToggablePasswordViewInput: React.FC<ToggablePasswordViewInputProps> =
  ({ inputName, handleChange, handleBlur, ...rest }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <InputGroup>
        <Input
          name={inputName}
          type={showPassword ? 'text' : 'password'}
          placeholder="*******"
          size="lg"
          onChange={handleChange}
          onBlur={handleBlur}
          {...rest}
        />
        <InputRightElement width="3rem">
          <Button
            aria-label="toggle-password-visibility"
            h="1.5rem"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
    );
  };
