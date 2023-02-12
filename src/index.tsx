import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import { paths } from './lib/constants';

import App from './pages/home/App';
import Results from './pages/results/Results';

import './index.css';

const router = createBrowserRouter([
  {
    path: paths.root,
    element: <App />,
		errorElement: <App />,
  },
  {
    path: paths.results,
    element: <Results />,
		errorElement: <App />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
