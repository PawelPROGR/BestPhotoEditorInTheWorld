import './App.css';
import MainPage from './components/MainPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://192.168.56.1:5000/api'

const Main = () => {

    return (
        <div className="App">
            <div className='logo'>Sputnik<div className="logoPhotoColor">Photo</div></div>
            <MainPage />
        </div>
    );
}

export default Main;
