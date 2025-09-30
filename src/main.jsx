import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './home/home.jsx'
import Food from './food/food.jsx'
import './styles/common.css'

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/React-Week4/" element={<Home />} />
      <Route path="/React-Week4/:id" element={<Food />} />
    </Routes>
  </Router>
)
