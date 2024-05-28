import Calendar from 'react-calendar';
import {FC, useContext, useEffect, useState} from "react";
import '../../callendar.css';
//import 'react-calendar/dist/Calendar.css';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import ukLocale from '@fullcalendar/core/locales/uk'; // Замініть імпорт
import interactionPlugin from '@fullcalendar/interaction';
import NewsUtils from "../../domain/utils/NewsUtils";
import StoreEvent from "../../domain/utils/EventsUtils";


const CalendarForm = ({ context }) => {
    const { store } = context
    const [events, setEvents] = useState([]); // Стан для зберігання подій
    const [selectedDate, setSelectedDate] = useState(null); // Стан для вибраної дати
    const [selectedEventId, setSelectedEventId] = useState(null); // Стан для вибраної дати
    const [eventName, setEventName] = useState(""); // Стан для назви події


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const isAuthenticated = await store.checkAuth();
                if (isAuthenticated) {

                    const username = store.user.login;
                const response = await StoreEvent.fetchEvent(username, (error) => {
                    console.error("Error fetching news:", error);
                });
                console.log(response);
                setEvents(response.events);}
                //TODO
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);


    const saveEvent = async (eventData) => {
        try {
            console.log(eventData)
           const response =  await StoreEvent.saveEvent(eventData, (error) => {
                console.error("Error unsaving news:", error);
            });
            return response
        } catch (error) {
            console.error('Error saving event:', error);
            throw new Error('Error saving event.');
        }
    };

    // Функція для додавання нової події
    const handleAddEvent = async (events) => {
        if (selectedDate && eventName) {
            const newEvent = {
                username: store.user.login,
                title: eventName,
                date: selectedDate,
                allDay: true
            };

            const eventId = await saveEvent(newEvent);

            newEvent.eventId = eventId

            console.log("ssss HERE RENAT!!!!!!!!", newEvent)
            setEvents([...events, newEvent]);

            setSelectedDate(null);
            setEventName("");
        }
    };
    const deleteEvent = async (eventId) => {
        try {
            await StoreEvent.deleteEvent(eventId, (error) => {
                console.error("Error deleting event:", error);
            });
        } catch (error) {
            console.error('Error deleting event:', error);
            throw new Error('Error deleting event.');
        }
    };


    function convertDateString(dateString) {
        const [year, month, day] = dateString.split('-');

        const isoDateString = `${year}-${month}-${day}T00:00:00.000Z`;

        return isoDateString;
    }

    function convertDateString1(dateString) {
        // const dateObject = parseDateString(dateString);
        return new Date(dateString).toISOString().split('T')[0];
    }

    function handleDeleteEvent(events) {
        try {
            if (selectedEventId == null) return

            console.log(events)
            console.log(selectedEventId)

            setEvents(events.filter(event => event.eventId !== selectedEventId))

            deleteEvent(selectedEventId);

            setSelectedEventId(null)
        } catch (error) {
            console.error("Error in handleDeleteEvent:", error);
        }
    }

    async function editEvent(selectedEventId, eventName) {
        try {
            console.log(selectedEventId,eventName )
            await StoreEvent.editEvent(selectedEventId, eventName, (error) => {
                console.error("Error editing event:", error);
            });
        } catch (error) {
            console.error('Error editing event:', error);
            throw new Error('Error editing event.');
        }

    }

    function handleEditEvent(events, eventName) {
        try {
            console.log(eventName);
            if (selectedEventId == null) return
            console.log(eventName);

            editEvent(selectedEventId, eventName);

        } catch (error) {
            console.error("Error in handleEditEvent:", error);
        }
    }

    console.log(selectedEventId)

    return (
        <div className='container-callendar'>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                editable={true}
                locale={ukLocale}
                selectable={true}
                events={events}
                select={(info) => setSelectedDate(info.startStr)}
                eventClick={(info) => setSelectedEventId(info.event._def.extendedProps.eventId)}

            />
            <div className='event-maker'>
                <input className='input-event'
                       type="text"
                       value={eventName}
                       onChange={(e) => setEventName(e.target.value)}
                       placeholder="назва події"
                />
                <div className='event-buttons'>
                    <button onClick={() => handleAddEvent(events)}>Створити подію</button>
                    <button
                        disabled={selectedEventId == null || eventName.trim() === ""}
                        className={(selectedEventId == null || eventName.trim() === "") ? "event-button-disabled" : ""}
                        onClick={() => handleEditEvent(events, eventName)}
                    >
                        Редагувати
                    </button>
                    <button
                        disabled={selectedEventId == null }
                        className={selectedEventId == null ? "event-button-disabled" : ""}
                        onClick={() => handleDeleteEvent(events)}
                    >
                        Видалити подію
                    </button>
                </div>
            </div>
        </div>
    );


}


export default CalendarForm;