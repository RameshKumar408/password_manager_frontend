import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './component/Dashboard'
import Fileslist from './component/Fileslist'
import Createllist from './component/Createlist'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/fileslist" element={<Fileslist />} />
        <Route path="/createlist" element={<Createllist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
