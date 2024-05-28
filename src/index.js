import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from "./domain/store/Store";

// Оголошуємо інтерфейс State
// interface State {
//     store: Store;
// }
//
// // Створюємо екземпляр Store
// export const store = new Store();
//
// // Створюємо контекст з типом State
// export const Context = createContext<State>({
//     store,
// });
//
// // Рендеримо додаток, передаючи контекст
// ReactDOM.render(
//     <Context.Provider value={{ store }}>
//         <App />
//     </Context.Provider>,
//     document.getElementById('root')
// );

const store = new Store();
export const Context = createContext({ store: store });

ReactDOM.render(
    React.createElement(Context.Provider, { value: { store } },
        React.createElement(App, null)
    ),
    document.getElementById('root')
);