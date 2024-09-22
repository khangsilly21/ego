import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Car1 from './components/Car1';
import Car2 from './components/Car2';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import Car from './components/Car';
import Setting from './components/Setting';
import Dormitory from './components/Dormitory';
import Guide from './components/Guide';
import DiemDanhComponent from './components/DiemDanhComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/car' element={<Car/>}>
            <Route path='/car/1' element={<Car1/>}></Route>
            <Route path='/car/2' element={<Car2/>}/>
            
          </Route>
          <Route path='/setting' element={<Setting/>}>
            <Route path='/setting/xe1' element={<DiemDanhComponent id={1}/>}></Route>
            <Route path='/setting/xe2' element={<DiemDanhComponent id={2}/>}></Route>
          </Route>
          <Route path='/dormitory' element={<Dormitory/>}/>
          <Route path='/guide' element={<Guide/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
