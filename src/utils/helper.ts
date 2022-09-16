import { EventsType, EventType } from '../types';

export const combineClassName = (...classnames: string[]): string => {
  return classnames.join(' ');
};

export const pad = (time: number) => {
  return `0${time}`.slice(-2);
};

export const isSameDay = (a: Date, b: Date): boolean => {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
};

export const EventSort = (problems: EventsType, func: (a: EventType, b: EventType) => number) => {
  return problems.sort(func);
};

export const getWeek = (year: number, month: number, date: number, day: number): Date[] => {
  const weeks = [0, 1, 2, 3, 4, 5, 6].map((week) => new Date(year, month, date + (week - day)));
  return weeks;
};

export const getSelectedDateInfo = (selectedDate: Date) => {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const date = selectedDate.getDate();
  const day = selectedDate.getDay();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  return {
    year,
    month,
    date,
    day,
    firstDay,
    lastDay,
  };
};

export const getSimpleDateFormat = (d: Date, separator = '-') => {
  return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join(separator);
};

export const getDateTimeFormat = (d: Date, separator = ':') => {
  return [d.getHours(), pad(d.getMinutes())].join(separator);
};
