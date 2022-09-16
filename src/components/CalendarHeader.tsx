import React from 'react';
import useStore from '../store';
import { getSelectedDateInfo } from '../utils/helper';

interface Props {
  handleAddEventModalOpen: (e: React.MouseEvent) => void;
  handleAllEventsModalOpen: (e: React.MouseEvent) => void;
}

const CalendarHeader = ({ handleAddEventModalOpen, handleAllEventsModalOpen }: Props) => {
  const { selectedDate, selectDate } = useStore();
  const { year, month } = getSelectedDateInfo(selectedDate);
  return (
    <div className="mb-2 flex w-full items-center space-x-4 text-white">
      <div className="flex w-full items-center space-x-4">
        <button
          className="rounded p-2 ring-1 ring-transparent ring-offset-1"
          onClick={() => selectDate(new Date(selectedDate.setDate(selectedDate.getDate() - 7)))}
        >
          <svg width={15} height={15} fill="currentColor" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"
            ></path>
          </svg>
        </button>
        <span className="text-center text-xl font-bold ">{`${year}년 ${month + 1}월`}</span>
        <button
          className="rounded p-2 ring-1 ring-transparent ring-offset-1"
          onClick={() => selectDate(new Date(selectedDate.setDate(selectedDate.getDate() + 7)))}
        >
          <svg width={15} height={15} fill="currentColor" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z"
            ></path>
          </svg>
        </button>
      </div>
      <div className="ml-auto flex w-full items-center justify-end space-x-4">
        <button onClick={handleAllEventsModalOpen} className="rounded p-2 ring-1 ring-transparent ring-offset-1">
          show all events
        </button>
        <button onClick={handleAddEventModalOpen} className="rounded p-2 ring-1 ring-transparent ring-offset-1">
          add event
        </button>
      </div>
    </div>
  );
};

export default React.memo(CalendarHeader);
