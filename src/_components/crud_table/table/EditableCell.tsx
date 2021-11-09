import { Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateData,
}) => {
  const [value, setValue] = useState(initialValue);
  const [previousValue, setPreviousValue] = useState(initialValue);
  const [areChangesUnsaved, setAreChangesUnsaved] = useState(false);

  useEffect(() => {
    setValue(initialValue);
    setPreviousValue(initialValue);
    setAreChangesUnsaved(false);
  }, [initialValue]);

  const onChange = (e) => {
    setPreviousValue(value);
    setValue(e.target.value);
  };

  const onBlur = () => {
    if (value === initialValue) {
      setAreChangesUnsaved(false);
      return;
    }

    if (previousValue !== value) {
      setAreChangesUnsaved(true);
    } else {
      setAreChangesUnsaved(false);
    }
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter' && !updateData(index, id, value)) {
      setValue(initialValue);
    }
  };

  return (
    <Input
      variant="light-outline"
      borderColor={areChangesUnsaved ? 'gray.600' : 'gray.300'}
      value={value}
      {...{ onChange, onKeyPress, onBlur }}
    />
  );
};

export const defaultColumn = {
  Cell: EditableCell,
};
