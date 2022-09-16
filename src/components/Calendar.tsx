import React, { useEffect } from 'react';
import { combineClassName, EventSort, getSelectedDateInfo, getWeek, isSameDay } from '../utils/helper';
import { EventType } from '../types';
import Event from './Evnet';
import useStore from '../store';

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const Calendar = (): JSX.Element => {
  const { weeks, setWeeks, selectedDate, selectDate, events, setEvents } = useStore();

  const { year, month, date, day, firstDay, lastDay } = getSelectedDateInfo(selectedDate);

  useEffect(() => {
    setWeeks(getWeek(year, month, date, day));
  }, [selectedDate]);

  return (
    <div className="mt-2 flex w-full flex-col items-center justify-between text-white">
      <div className="flex w-full flex-col items-center justify-between">
        <div className="flex w-full items-center justify-center border">
          {DAYS.map((days) => (
            <span key={days} className="mb-1 flex w-full items-center  justify-center text-sm">
              {days}
            </span>
          ))}
        </div>
        <div className="flex w-full items-center justify-center border">
          {weeks.map((week) => {
            const today = new Date();
            const thisday = new Date(week);
            const isToday = isSameDay(today, thisday);
            const isSelectedDay = isSameDay(selectedDate, thisday);
            return (
              <div
                key={week.valueOf()}
                onClick={() => selectDate(thisday)}
                className={combineClassName(
                  'mb-1 flex h-14 w-full  items-center justify-center rounded-full text-3xl font-bold',
                )}
              >
                <span
                  className={combineClassName(
                    'mb-1 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-3xl font-bold hover:bg-gray-500 ',
                    isToday ? 'bg-purple-600' : '',
                    isSelectedDay && !isToday ? 'bg-purple-300' : '',
                  )}
                >
                  {week.getDate()}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex w-full items-center justify-center">
          {weeks.map((week) => {
            const thisday = new Date(week);
            const sortEvents = [...events];
            EventSort(sortEvents, (a: EventType, b: EventType): number => {
              const aStartTime = a.start.date ? a.start.date : a.start.dateTime;
              const bStartTime = b.start.date ? b.start.date : b.start.dateTime;
              return new Date(aStartTime as string).valueOf() - new Date(bStartTime as string).valueOf();
            });
            const thisEvents = sortEvents.filter((event) => {
              if (event.start.dateTime != null) {
                return isSameDay(thisday, new Date(event.start.dateTime));
              }
              if (event.start.date != null) {
                return isSameDay(thisday, new Date(event.start.date));
              }
            });

            return (
              <div key={week.valueOf()} className="flex w-full flex-col items-center justify-center">
                {thisEvents.map((event) => {
                  const eventStartDate = event.start.date ? event.start.date : event.start.dateTime;
                  const eventEndDate = event.end.date ? event.end.date : event.end.dateTime;
                  return (
                    <Event
                      key={event.id}
                      summary={event.summary}
                      description={event.description}
                      eventStartDate={eventStartDate as string}
                      eventEndDate={eventEndDate as string}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Calendar);
