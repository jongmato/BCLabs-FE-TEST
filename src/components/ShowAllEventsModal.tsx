import React from 'react';
import useStore from '../store';
import { getDateTimeFormat, getSimpleDateFormat } from '../utils/helper';
import Modal from './Modal';

interface Props {
  onClose: (e: React.MouseEvent) => void;
}
const ShowAllEventsModal = ({ onClose }: Props) => {
  const { events } = useStore();
  return (
    <Modal title="모든 일정 리스트" onClose={onClose}>
      {events.map((event) => {
        const eventStartDate = event.start.date ? event.start.date : event.start.dateTime;
        const eventEndDate = event.end.date ? event.end.date : event.end.dateTime;
        return (
          <div
            key={event.id}
            className="mb-4 flex w-full flex-col items-start justify-center space-y-4 overflow-y-auto rounded-2xl bg-violet-500 p-2"
          >
            <span className="text-2xl">{event.summary}</span>
            <span>{event.description}</span>
            <span>{`${getSimpleDateFormat(new Date(eventStartDate as string))} ${getDateTimeFormat(
              new Date(eventStartDate as string),
            )} ~ ${getSimpleDateFormat(new Date(eventEndDate as string))} ${getDateTimeFormat(
              new Date(eventEndDate as string),
            )}`}</span>
          </div>
        );
      })}
    </Modal>
  );
};

export default ShowAllEventsModal;
