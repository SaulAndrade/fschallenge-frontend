import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import * as Realm from "realm-web";
import './index.css'

export const app = new Realm.App({ id: "audela-app-mglfw" });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);