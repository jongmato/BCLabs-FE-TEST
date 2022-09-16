import React from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
}

const Portal = ({ children }: Props): JSX.Element => {
  const rootElement = document.getElementById('modal-root');
  return <>{rootElement ? createPortal(children, rootElement) : children}</>;
};

export default Portal;
