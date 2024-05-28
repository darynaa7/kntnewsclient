import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
//import {Context} from "../../index";
//import {observer} from "mobx-react-lite";

// ...

const RegisterForm: FC = observer(({ context }) => {

    const {store} = context;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gmail, setGmail] = useState('');
    const [password2, setPassword2] = useState('');

    const [registrationErrorMessage, setRegistrationErrorMessage] = useState(null);
    const [loged, setLoged] = useState(false);
    const navigate = useNavigate()
    // const [username, setUsername] = useState<any>('');
    // const [password, setPassword] = useState<string>('');
    // const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(null);
    // const [registrationErrorMessage, setRegistrationErrorMessage] = useState<string | null>(null);


    useEffect(() => {


    }, [])


    const handleRegistration = async () => {
        try {
            console.log("тут")
            const isAuthenticated = await store.registration(username, password, password2, (error) => {
                setRegistrationErrorMessage(error)
            });
            if (isAuthenticated) {
                setTimeout(() => {
                }, 500)
                navigate('/profile')
            }
            setLoged(true);
        } catch (error) {
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className='login-container'>
            <h2 className='registration-header'>Реєстрація</h2>
            <h3 className='login-link' onClick={handleLoginClick}>Увійти в акаунт</h3>

            {/*<div className='input-container'>*/}
            {/*    <input*/}
            {/*        className='input-field'*/}
            {/*        onChange={e => setGmail(e.target.value)}*/}
            {/*        value={gmail}*/}
            {/*        type="text"*/}
            {/*        placeholder='Пошта'*/}
            {/*    />*/}
            {/*</div>*/}
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
            <div className='input-container'>
                <input
                    className='input-field'
                    onChange={e => setPassword2(e.target.value)}
                    value={password2}
                    type="password"
                    placeholder='Пароль ще раз'
                />
            </div>

            <div className='button-container'>
                <button className='signup-button' onClick={handleRegistration}>
                    Зареєструватись
                </button>
                <div className="error-text registration-error">
                    {registrationErrorMessage == null ? "" : registrationErrorMessage?.toString()}
                </div>
            </div>
        </div>

    );
});

export default RegisterForm;