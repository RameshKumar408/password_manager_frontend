import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './component/Dashboard'
import Fileslist from './component/Fileslist'
import Createllist from './component/Createlist'
import Updatelist from './component/Updatelist'
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
        <Route path="/updatelist" element={<Updatelist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
