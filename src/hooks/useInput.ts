import { Dispatch, SetStateAction, useCallback, useState } from 'react';

interface Props {
  initialValue: string;
}

const useInput = ({
  initialValue = '',
}: Props): {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValue: Dispatch<SetStateAction<string>>;
} => {
  const [value, setValue] = useState(initialValue);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setValue(e.currentTarget.value);
  }, []);
  return { value, handleChange, setValue };
};

export default useInput;
