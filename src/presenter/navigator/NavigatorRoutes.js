import {FC, useEffect, useState} from "react";
import {Route, Router, Routes, useNavigate} from "react-router-dom";
import NewsForm from "../forms/NewsForm";
import RegisterForm from "../forms/RegisterForm";
import CalendarForm from "../forms/CalendarForm";
import ProfileForm from "../forms/ProfileForm";
import LoginForm from "../forms/LoginForm";
import * as React from "react";
import NavigatorForm from "./NavigatorForm";

const NavigatorRoutes: FC = ({ context }) => {
    const { store } = context;
    const navigate = useNavigate()

    useEffect(() => {
        if (!store.checkAuth()){
            navigate("/register")
        }
        //store.checkIfUserLoggedIn()
        // if TRUE: navigate("/login")
        // if FALSE: show page
    }, [store]);


    return (
        <Routes>
            <Route path="/news" element={<NewsForm context={ context }/>}/>
            {/*<Route path="/paticularnews" element={<RegisterForm context={ context }/>}/>*/}
            <Route path="/calendar" element={<CalendarForm context={ context }/>}/>
            <Route path="/profile" element={<ProfileForm context={ context }/>}/>
            <Route path="/login" element={<LoginForm context={ context }/>}/>
            <Route path="/register" element={<RegisterForm context={ context }/>}/>
        </Routes>
    )
}

export default NavigatorRoutes