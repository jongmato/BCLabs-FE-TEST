import create from 'zustand';
import { EventsType } from '../types';

interface State {
  events: EventsType;
  setEvents: (events: EventsType) => void;
  weeks: Date[];
  setWeeks: (weeks: Date[]) => void;
  selectedDate: Date;
  selectDate: (date: Date) => void;
}
const useStore = create<State>((set, get) => ({
  events: [],
  weeks: [],
  selectedDate: new Date(),
  setEvents: (events: EventsType) => set({ events: events }),
  setWeeks: (weeks: Date[]) => set({ weeks: weeks }),
  selectDate: (date: Date) => set({ selectedDate: date }),
}));

export default useStore;
