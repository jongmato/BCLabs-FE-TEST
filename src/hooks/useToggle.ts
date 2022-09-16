import { Dispatch, SetStateAction, useCallback, useState } from 'react';

interface Props {
  initialValue: boolean;
}

const useToggle = ({
  initialValue = false,
}: Props): {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  handleOpen: (e: React.MouseEvent) => void;
  handleClose: (e: React.MouseEvent) => void;
  handleToggle: (e: React.MouseEvent) => void;
} => {
  const [show, setShow] = useState(initialValue);

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShow((prevState) => !prevState);
  }, []);

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShow(false);
  }, []);

  const handleOpen = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShow(true);
  }, []);

  return { show, setShow, handleOpen, handleClose, handleToggle };
};

export default useToggle;
