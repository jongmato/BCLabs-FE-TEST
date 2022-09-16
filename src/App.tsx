import { gapi } from 'gapi-script';
import React, { useEffect, useState } from 'react';
import AddEventModal from './components/AddEventModal';
import Calendar from './components/Calendar';
import CalendarHeader from './components/CalendarHeader';
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
        <CalendarHeader
          handleAddEventModalOpen={handleAddEventModalOpen}
          handleAllEventsModalOpen={handleAllEventsModalOpen}
        />
        <Calendar />
      </div>
      {showAddEventModal && <AddEventModal onClose={handleAddEventModalClose} />}
      {showAllEventsModal && <ShowAllEventsModal onClose={handleAllEventsModalClose} />}
    </div>
  );
}

export default App;
