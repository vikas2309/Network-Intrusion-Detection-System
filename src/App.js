import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Input from './components/Input';

function App() {
  return (
    <>
      <div className='Nids'>
      <Router>
      <Navbar />
        <Routes>
            <Route  path="/" element={<Login/>} />
            <Route  path="/login" element={<Login/>}/>
            <Route  path="/signup" element={<Signup/>}/>
            <Route  path="/Input" element={<Input/>}/>
        </Routes>
      </Router>
      </div>
    </>
  )
}

export default App;
