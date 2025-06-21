import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import './index.css'
import App from './App.jsx'
import DownloadIdCard from './pages/DownloadIdCard.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/DownloadIdCard" element={<DownloadIdCard />} />
      </Routes>
    </Router>

  </StrictMode>,
)
