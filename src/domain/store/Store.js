import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import {API_URL} from '../../data/server.ts';

export default class Store {
    user: IUser = {}
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        console.log(user)
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(username: string, password: string, onError: (error: any) => void) {
        try {
            const response = await AuthService.login(username, password);
            console.log(response)

            if (response.data.error === undefined) {
                localStorage.setItem('token', response.data.token);
                this.setAuth(true);
                this.setUser(response.data.user);
                return this.isAuth;
            } else {
                onError(response.data.error)
            }
        } catch (e) {
            onError(e.response?.data?.message)
            console.error("Помилка входу:", e.response?.data?.message || "Невідома помилка");
        }
    }


    async registration(username: string, password: string, password2: string, onError: (error: any) => void) {
        try {
            if (password === "") {
                onError("пароль не може бути пустим:(")
                return
            }
            console.log("тут1")

            if (username === "") {
                onError("логін не може бути пустим:(")
                return
            }

            if (password !== password2){
                onError("паролі не збігаються:(")
                return
            }

            const response = await AuthService.registration(username, password);
            console.log(response)
            console.log(response.data.token)


            if (response.data.error === undefined) {
                localStorage.setItem('token', response.data.token);
                this.setAuth(true);
                this.setUser(response.data.user);
                return this.isAuth;

            } else {
                onError(response.data.error)
            }
        } catch (e) {
            onError(e)
            console.log(e.response?.data?.message);
        }
    }

    async logout(username) {
        try {

            const response = await axios.post(`${API_URL}/auth/logout/${username}`);
            console.log(response)
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log("Token not found in localStorage");
                 //this.setAuth(false);
                 console.log(this.isAuth)
                 return false; // Повертаємо false, якщо токен відсутній
            }
            console.log('biba')
            const response = await axios.get(`${API_URL}/auth/checkauth`, {
                headers: {
                    'Authorization': token
                }
            });
            console.log("res", response)
            localStorage.setItem('token', response.data.token);
            this.setUser(response.data.user);

            console.log("must be not undef", this.isAuth)
            this.setAuth(true);

            return this.isAuth;
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    async fetchMarkedNews(login) {
        try {
            const response = await axios.get(`${API_URL}/news/marked/${login}`)

            if (!response) console.log('no response');

            console.log("RESPONSE DATA: " + JSON.stringify(response.data))
            console.log("RESPONSE DATA: " + JSON.stringify(response))

            return (response.data.markedNews)
        } catch (e) {
            console.log(e.response?.data?.message);
            console.log(e);
        } finally {
            this.setLoading(false);
        }
    }
    async fetchPopularNews() {
        try {
            const response = await axios.get(`${API_URL}/news/popular/`)

            if (!response) console.log('no response');

            return (response.data.markedNews)
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

}