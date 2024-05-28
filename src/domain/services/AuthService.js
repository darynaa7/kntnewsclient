import $api from '../../data/server.ts';
import {AxiosResponse} from 'axios';

export default class AuthService {

    static async login(username: string, password: string): Promise<AxiosResponse> {
        return $api.post('/auth/login', {username, password})
    }

    static async registration(username: string, password: string): Promise<AxiosResponse> {
        return $api.post('/auth/registration', {username, password})
    }

    static async loguot(): Promise<void> {
        return $api.post('/auth/logout')

    }
}