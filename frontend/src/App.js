// import './App.css';
// import Signup from "./components/Signup";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Alert from "./components/Alert";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
    <Router>
          {/* <Navbar /> */}
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/register" element={<Register showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
    </>
  );
}

export default App;
