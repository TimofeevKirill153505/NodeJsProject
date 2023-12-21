import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CarsStore from './store/CarsStore';
import NewsStore from './store/NewsStore';
import UserStore from './store/UserStore';
import ReviewStore from './store/ReviewStore';
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
export const Context = createContext(null);
root.render(
	<Context.Provider value={{
		someString: "str",
		carsStore: new CarsStore(),
		newsStore: new NewsStore(),
		userStore: new UserStore(),
		reviewStore: new ReviewStore()
	}}>
		<App />
	</Context.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
