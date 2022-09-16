import React from 'react';
import { getDateTimeFormat } from '../utils/helper';

interface Props {
  summary: string;
  description: string;
  eventStartDate: string;
  eventEndDate: string;
}

function Event({ summary, description, eventStartDate, eventEndDate }: Props) {
  return (
    <div className="mb-2  flex w-full flex-col items-start justify-center space-y-1 rounded-2xl bg-indigo-500 p-2">
      <span className="text-2xl">{summary}</span>
      <span>{description}</span>
      <span>{`${getDateTimeFormat(new Date(eventStartDate))} ~ ${getDateTimeFormat(new Date(eventEndDate))}`}</span>
    </div>
  );
}

export default React.memo(Event);
