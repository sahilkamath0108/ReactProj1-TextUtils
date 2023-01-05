import React from "react";
import Navbar from "./Navbar";
import TextForm from "./TextForm";
import About from "./About";
import { useState } from "react";
import Alert from "./Alert";
import { 
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"


function App(){

  const [mode, setMode] = useState('light')
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) =>{
    setAlert({
      message : message,
      type : type
    })
    setTimeout(()=>{
      setAlert(null)
    }, 1000)
  }

  const toggleMode = () => {
    if(mode === 'light'){
      setMode('dark')
      document.body.style.backgroundColor="grey"
      showAlert("Dark mode has been enabled", "success")
    }else{
      setMode('light')
      document.body.style.backgroundColor="white"
      showAlert("Light mode has been enabled", "success")
    }
  }

  return (
    <>
    <Router>
    <Navbar title="TextUtils" aboutText="About TextUtils"  mode={mode} toggleMode={toggleMode} />
    <Alert alert={alert}/>
    <div className="container my-3">
    <Routes>
      <Route exact path="/" element={<TextForm showAlert={showAlert} heading="Enter the Text to analyze" mode={mode} />} />
      <Route exact path="/about" element=<About /> />
    </Routes>
    
    </div>
    </Router>
    
    </>
  )
}

export default App