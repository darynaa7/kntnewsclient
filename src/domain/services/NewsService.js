import $api from '../../data/server.ts';
import axios, {AxiosResponse} from 'axios';

export default class NewsService {

    static async fetchNews(): Promise<AxiosResponse> {
        return $api.get('/news')
    }

    static async saveNews(username: string, newsData: any): Promise<AxiosResponse> {
        return axios.post('/news/marked', {username, newsData});
    }
}