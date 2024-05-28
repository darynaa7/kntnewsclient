import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import ProfileForm from "./ProfileForm";
import {useNavigate} from "react-router-dom";

const LoginForm: FC = observer(({ context }) => {
    const { store } = context;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginErrorMessage, setLoginErrorMessage] = useState("");
    const loginErrorMessage2 = useRef("")
    const [registrationErrorMessage, setRegistrationErrorMessage] = useState(null);
    const [loged, setLoged] = useState(false);
    const navigate = useNavigate()
    // const [username, setUsername] = useState<any>('');
    // const [password, setPassword] = useState<string>('');
    // const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(null);
    // const [registrationErrorMessage, setRegistrationErrorMessage] = useState<string | null>(null);


    useEffect(() => {


    }, [])

    const handleLogin = async () => {
        try {
            const isAuthenticated =  await store.login(username, password, (error) => {
                console.log("EERROR: " + error)
                console.log("EERROR 2:  " + loginErrorMessage)
                setLoginErrorMessage(error)
                console.log("EERROR 3:  " + loginErrorMessage)
                setRegistrationErrorMessage(null)
            });
            if (isAuthenticated) {
                setTimeout(() => {}, 500)
                navigate('/profile')
            }

            setLoged(true);
        } catch (error) {

        }
    };

    // const handleRegistration = async () => {
    //     try {
    //         const isAuthenticated = await store.registration(username, password, (error) => {
    //             setRegistrationErrorMessage(error)
    //             setLoginErrorMessage(null)
    //         });
    //         if (isAuthenticated) {
    //             setTimeout(() => {}, 500)
    //             navigate('/profile')
    //         }
    //         setLoged(true);
    //     } catch (error) { }
    // };

    // if (loged) {
    //     return (
    //         <div>
    //             <ProfileForm/>
    //         </div>
    //     );
    // }
    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <div className='login-container'>
            <h2 className='registration-header'>Вхід</h2>
            <h3 className='login-link' onClick={handleRegisterClick}>Зареєструватись</h3>

            <div className='input-container'>
                <input
                    className='input-field'
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                    type="text"
                    placeholder='Логін'
                />
            </div>
            <div className='input-container'>
                <input
                    className='input-field'
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder='Пароль'
                />
            </div>
            <div className='button-container'>
                <button className='signin-button' onClick={handleLogin}>
                    Увійти
                </button>
                <div className="error-text login-error">
                    {loginErrorMessage == null ? "" : loginErrorMessage?.toString()}
                </div>
            </div>

            {/*<div className='button-container'>*/}
            {/*    <button className='signup-button' onClick={handleRegistration}>*/}
            {/*        Sign up*/}
            {/*    </button>*/}
            {/*    <div className="error-text registration-error">*/}
            {/*        {registrationErrorMessage == null ? "" : registrationErrorMessage?.toString()}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>

    );
});

export default LoginForm;