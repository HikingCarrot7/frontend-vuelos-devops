import React, { useEffect, useState } from 'react';

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}) => {
  const [value, setValue] = useState(initialValue);
  const [previousValue, setPreviousValue] = useState(initialValue);
  const [areChangesUnsaved, setAreChangesUnsaved] = useState(false);

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
    if (e.key === 'Enter' && !updateMyData(index, id, value)) {
      setValue(initialValue);
    }
  };

  useEffect(() => {
    setValue(initialValue);
    setPreviousValue(initialValue);
    setAreChangesUnsaved(false);
  }, [initialValue]);

  return (
    <>
      {areChangesUnsaved && <span>*</span>}{' '}
      <input
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onBlur={onBlur}
      />
    </>
  );
};

export const defaultColumn = {
  Cell: EditableCell,
};
