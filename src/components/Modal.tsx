import React from 'react';
import Portal from './Portal';

interface Props {
  title: string;
  onClose: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

const Modal = ({ title, onClose, children }: Props) => {
  return (
    <Portal>
      <div className="fixed top-0 right-0 bottom-0 left-0 z-10 flex items-center justify-center overflow-hidden bg-gray-700 bg-opacity-50">
        <div className="relative flex h-2/3 w-full max-w-xl flex-col items-center overflow-y-auto rounded bg-white p-3">
          <div className=" flex w-full items-center justify-between pb-3">
            <span className="text-3xl font-bold">{title}</span>
            <button onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="w-full p-4">{children}</div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
