import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import DataContextProvider from "./components/data/DataContextProvider";
import App from './App';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <DataContextProvider>
              <App />
          </DataContextProvider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


