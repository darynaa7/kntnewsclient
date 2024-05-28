import React, {useState} from 'react';

import ProfileForm from "../forms/ProfileForm";
import RegisterForm from "../forms/RegisterForm";

const TabBar = () => {
    const [activeTab, setActiveTab] = useState(1); // початкова активна вкладка

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    return (
        <div className="tab-bar">
            <div className="logo">
                <button className="logo-button">Your Logo</button>
            </div>
            <div className="tabs">
                <button
                    className={activeTab === 1 ? 'tab active' : 'tab'}
                    onClick={() => handleTabClick(1)}
                >
                    hot news
                </button>
                <button
                    className={activeTab === 2 ? 'tab active' : 'tab'}
                    onClick={() => handleTabClick(2)}
                >
                    gallery
                </button>
                <button
                    className={activeTab === 3 ? 'tab active' : 'tab'}
                    onClick={() => handleTabClick(3)}
                >
                    events
                </button>
                <button
                    className={activeTab === 4 ? 'tab active' : 'tab'}
                    onClick={() => handleTabClick(4)}
                >
                    profile
                </button>
                {activeTab === 1 && <ProfileForm/>}
                {activeTab === 2 && <RegisterForm/>}
                {activeTab === 4 && <ProfileForm/>}

            </div>
        </div>
    );
};


export default TabBar;
