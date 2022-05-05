import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Deshbord from "./components/deshbord";
import Signin from "./components/signinSignup/signin";
import User from "./components/User.js/User";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Deshbord />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/user" element={<User />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
