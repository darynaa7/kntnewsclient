import NewsService from "../services/NewsService";
import axios from "axios";
import {AxiosResponse} from "axios";
import {API_URL} from '../../data/server.ts';

export default class NewsUtils {

    static async fetchNews(onError: (error: any) => void): Promise<AxiosResponse> {
        try {

            const response = await NewsService.fetchNews();

            if (!response) throw new Error('Failed to fetch news');

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

    static async saveNews(username, newsData, onError: (error: any) => void): Promise<AxiosResponse> {
        try {
            const response = await axios.post(`${API_URL}/news/marked`, {username, newsData});

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

    static async unsaveNews(username, newsData, onError: (error: any) => void): Promise<AxiosResponse> {
        try {

            const response = await axios.post(`${API_URL}/news/unsaved`, {username, newsData});


            if (!response) {
                throw new Error('Failed to unsave news');
            }

            return response;
        } catch (error) {
            onError(error);
            console.error("Помилка відображення новин:", error.message);
            throw error;
        }

    }


};