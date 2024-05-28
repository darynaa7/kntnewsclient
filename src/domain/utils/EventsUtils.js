import NewsService from "../services/NewsService";
import axios from "axios";
import {AxiosResponse} from "axios";
import {API_URL} from '../../data/server.ts';

export default class EventsUtils {
    static async fetchEvent(username, onError: (error: any) => void): Promise<AxiosResponse> {
        try {

            const response = await axios.get(`${API_URL}/event/${username}`)

            if (!response) {
                throw new Error('Failed to fetch news');
            }

            const data = response.data;

            if (data.error !== undefined) {
                onError(data.error);
                return;
            }
            console.log(data)
            return data;
        } catch (error) {
            onError(error);
            console.error("Помилка відображення новин:", error.message);
            throw error;
        }
    }

    static async saveEvent(eventData, onError: (error: any) => void): Promise<AxiosResponse> {
        try {
            console.log(eventData)
            const response = await axios.post(`${API_URL}/event`, {eventData});

            if (!response) {
                throw new Error('Failed to save news');
            }

            const data = response.data;

            if (data.error !== undefined) {
                onError(data.error);
                return;
            }

            return data;
        } catch (error) {
            onError(error);
            console.error("Помилка відображення новин:", error.message);
            throw error;
        }

    }

    static async deleteEvent(eventId, onError: (error: any) => void): Promise<AxiosResponse> {
        try {

            const response = await axios.post(`${API_URL}/event/deleted`, {eventId});

            if (!response) {
                throw new Error('Failed to delete event');
            }

            return response;
        } catch (error) {
            onError(error);
            console.error("Failed to delete event:", error.message);
            throw error;
        }

    }

    static async editEvent(selectedEventId, eventName, onError: (error: any) => void): Promise<AxiosResponse> {
        try {
            console.log(selectedEventId,eventName )

            const response = await axios.post(`${API_URL}/event/edit`, {selectedEventId, eventName});

            if (!response) {
                throw new Error('Failed to delete event');
            }

            return response;
        } catch (error) {
            onError(error);
            console.error("Failed to delete event:", error.message);
            throw error;
        }

    }

};