import * as React from "react";
import NewsForm from "../forms/NewsForm";
import CalendarForm from "../forms/CalendarForm";
import ProfileForm from "../forms/ProfileForm";
import {FC, useEffect, useState} from "react";
import {BrowserRouter, Link, Route, Routes, useNavigate} from "react-router-dom";
import RegisterForm from "../forms/RegisterForm";
import LoginForm from "../forms/LoginForm";
import NavigatorRoutes from "./NavigatorRoutes";

const NavigatorForm: FC = ({ context }) => {
    const [activeTab, setActiveTab] = useState(1)

    const Tabs = (
        <div>
            <div className="tab-bar">
                <div className="logo">
                    <button className="logo-button">KNT news</button>
                </div>
                <div className="tabs">
                    <Link
                        to={"/news"}
                        onClick={() => setActiveTab(1)}
                    >
                        <button className={activeTab === 1 ? 'tab-active' : 'tab'}>
                            Новини
                        </button>
                    </Link>
                    <Link
                        to={"/calendar"}
                        onClick={() => setActiveTab(2)}
                    >
                        <button className={activeTab === 2 ? 'tab-active' : 'tab'}>
                            Події
                        </button>
                    </Link>
                    <Link
                        to={"/profile"}
                        onClick={() => setActiveTab(3)}
                    >
                        <button className={activeTab === 3 ? 'tab-active' : 'tab'}>
                            Профіль
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )

    return (
        <BrowserRouter>
            {Tabs}
           <NavigatorRoutes context={ context }/>
        </BrowserRouter>
    )
}

export default NavigatorForm