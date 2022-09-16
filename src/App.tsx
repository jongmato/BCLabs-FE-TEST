import { gapi } from 'gapi-script';
import React, { useEffect, useState } from 'react';
import AddEventModal from './components/AddEventModal';
import Calendar from './components/Calendar';
import ShowAllEventsModal from './components/ShowAllEventsModal';
import useToggle from './hooks/useToggle';
import useStore from './store';
import { EventsType } from './types';
import { getSelectedDateInfo } from './utils/helper';

const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events';
const calendarID = process.env.REACT_APP_CALENDAR_ID as string;
const apiKey = process.env.REACT_APP_API_KEY as string;

function App() {
  const { weeks, setWeeks, selectedDate, selectDate, events, setEvents } = useStore();
  const { year, month, date, day, firstDay, lastDay } = getSelectedDateInfo(selectedDate);
  const {
    show: showAddEventModal,
    setShow: setShowAddEventModal,
    handleOpen: handleAddEventModalOpen,
    handleClose: handleAddEventModalClose,
  } = useToggle({
    initialValue: false,
  });
  const {
    show: showAllEventsModal,
    setShow: setShowAllEventsModal,
    handleOpen: handleAllEventsModalOpen,
    handleClose: handleAllEventsModalClose,
  } = useToggle({
    initialValue: false,
  });

  const getEvents = (calendarID: string, apiKey: string) => {
    function initiate() {
      gapi.client
        .init({
          apiKey: apiKey,
          discoveryDocs: [DISCOVERY_DOC],
          scope: SCOPES,
        })
        .then(function () {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
          });
        })
        .then(
          (response: { result: { items: EventsType } }) => {
            const events = response.result.items as EventsType;
            setEvents(events);
          },
          function (err: any) {
            return [false, err];
          },
        );
    }
    gapi.load('client', initiate);
  };

  useEffect(() => {
    getEvents(calendarID, apiKey);
  }, []);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-8">
      <h1 className="mb-4 flex justify-center text-2xl font-bold">주간 달력</h1>
      <div className="mt-2 flex h-screen w-full flex-col items-center rounded-md bg-slate-800 py-6 px-4">
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
        <Calendar />
      </div>
      {showAddEventModal && <AddEventModal onClose={handleAddEventModalClose} />}
      {showAllEventsModal && <ShowAllEventsModal onClose={handleAllEventsModalClose} />}
    </div>
  );
}

export default App;
