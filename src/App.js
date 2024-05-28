import './App.css';
//import {useContext} from "react";
//import {observer} from "mobx-react-lite";

import React, {createContext, FC, useContext, useEffect, useState} from "react";

import NavigatorForm from "./presenter/navigator/NavigatorForm";
import Store from "./domain/store/Store";
import {Context} from "./index";

const App: FC = () => {
    // const [activeTab, setActiveTab] = useState(1); // початкова активна вкладка
    //
    // const handleTabClick = (tabIndex) => {
    //     setActiveTab(tabIndex);
    // };

    const context = useContext(Context)

    useEffect(() => {
        const handleScroll = () => {
            const tabbar = document.querySelector('.tab-bar');
            if (tabbar) {
                if (window.scrollY > 0) {
                    tabbar.classList.add('transparent-bg');
                } else {
                    tabbar.classList.remove('transparent-bg');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // return (
    //     <div>
    //         <div className="tab-bar">
    //             <div className="logo">
    //                 <button className="logo-button">KNT news</button>
    //             </div>
    //             <div className="tabs">
    //                 <button
    //                     className={activeTab === 1 ? 'tab active' : 'tab'}
    //                     onClick={() => handleTabClick(1)}
    //                 >
    //                    новини
    //                 </button>
    //                 {/*<button*/}
    //                 {/*    className={activeTab === 2 ? 'tab active' : 'tab'}*/}
    //                 {/*    onClick={() => handleTabClick(2)}*/}
    //                 {/*>*/}
    //                 {/*    gallery*/}
    //                 {/*</button>*/}
    //                 <button
    //                     className={activeTab === 3 ? 'tab active' : 'tab'}
    //                     onClick={() => handleTabClick(3)}
    //                 >
    //                     події
    //                 </button>
    //                 <button
    //                     className={activeTab === 4 ? 'tab active' : 'tab'}
    //                     onClick={() => handleTabClick(4)}
    //                 >
    //                     профіль
    //                 </button>
    //             </div>
    //         </div>
    //         <div className="content">
    //             {activeTab === 1 && <NewsForm />}
    //             {activeTab === 3 && <CalendarForm />}
    //             {/*{activeTab === 2 && <RegisterForm />}*/}
    //             {activeTab === 4 && <ProfileForm />}
    //         </div>
    //     </div>
    // );

    return <NavigatorForm context={context}/>
};

export default App;