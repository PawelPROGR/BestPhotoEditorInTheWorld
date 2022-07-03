import './App.css';
import axios from 'axios';
import { HashRouter, Routes, Route } from 'react-router-dom';
import PhotoPage from './components/PhotoPage';
import Main from './Main';
axios.defaults.baseURL = 'http://192.168.56.1:5000/api'

const App = () => {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/times" element={<PhotoPage />} />
      </Routes>
    </HashRouter>

  );
}

export default App;
