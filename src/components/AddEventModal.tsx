import React from 'react';
import useInput from '../hooks/useInput';
import Modal from './Modal';
import { gapi } from 'gapi-script';

interface Props {
  onClose: (e: React.MouseEvent) => void;
}
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events';
const API_KEY = process.env.REACT_APP_API_KEY as string;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID as string;

const AddEventModal = ({ onClose }: Props) => {
  const { value: title, handleChange: handleTitleChange, setValue: setTitle } = useInput({ initialValue: '' });
  const {
    value: description,
    handleChange: handleDescriptionChange,
    setValue: setDescription,
  } = useInput({ initialValue: '' });
  const {
    value: startTime,
    handleChange: handleStartTimeChange,
    setValue: setStartTime,
  } = useInput({ initialValue: '' });
  const { value: endTime, handleChange: handleEndTimeChange, setValue: setEndTime } = useInput({ initialValue: '' });

  const addCalendarEvent = (e: React.MouseEvent) => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: [DISCOVERY_DOC],
        scope: SCOPES,
      });

      gapi.client.load('calendar', 'v3');

      const timeZone = 'Asia/Seoul';

      //sign in with pop up window
      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          const event = {
            summary: title,
            description: description,
            start: {
              dateTime: `${startTime}+09:00`,
              timeZone: timeZone,
            },
            end: {
              dateTime: `${endTime}+09:00`,
              timeZone: timeZone,
            },
            recurrence: ['RRULE:FREQ=DAILY;COUNT=1'],
            reminders: {
              useDefault: false,
              overrides: [{ method: 'popup', minutes: 20 }],
            },
          };

          const request = gapi.client.calendar.events
            .insert({
              calendarId: 'primary',
              resource: event,
            })
            .then((res: any) => {
              alert('이벤트 생성 성공');
              console.log(res);
              onClose(e);
            })
            .catch((err: any) => {
              alert('이벤트 생성 실패');
              console.log(err);
              onClose(e);
            });

          request.execute((event: { htmlLink: string | URL | undefined }) => {
            console.log(event);
          });
        });
    });
  };

  return (
    <Modal title="일정 추가" onClose={onClose}>
      <div className="flex flex-col">
        <label className="mb-1 block text-lg font-medium text-gray-700" htmlFor="title">
          제목
        </label>
        <input
          onChange={handleTitleChange}
          className="mb-4 w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
          id="title"
          placeholder="제목을 입력하세요"
        />
        <label className="mb-1 block text-lg font-medium text-gray-700" htmlFor="description">
          설명
        </label>
        <input
          onChange={handleDescriptionChange}
          className="mb-4 block w-full appearance-none rounded-lg border border-gray-300 p-2.5 placeholder-gray-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
          id="description"
          placeholder="설명을 입력하세요"
        />
        <label className="mb-1 block text-lg font-medium text-gray-700" htmlFor="starttime">
          시작 시간
        </label>
        <input
          onChange={handleStartTimeChange}
          className="mb-4 w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
          type={'datetime-local'}
          id="starttime"
        />
        <label className="mb-1 block text-lg font-medium text-gray-700" htmlFor="endtime">
          종료 시간
        </label>
        <input
          onChange={handleEndTimeChange}
          className="mb-4 w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
          type={'datetime-local'}
          id="endtime"
        />

        <button
          onClick={addCalendarEvent}
          className="w-full rounded-md border border-transparent bg-violet-500 p-2 text-center  text-xl font-bold text-white shadow-sm hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
        >
          생성하기
        </button>
      </div>
    </Modal>
  );
};

export default AddEventModal;
