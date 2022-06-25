import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Deshbord from "./components/Deshbord/deshbord";
import Friends from "./components/Deshbord/Friends/Friends.js";
import Signin from "./components/signinSignup/signin";
import User from "./components/User.js/User";
import Reset from "./components/signinSignup/reset";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Deshbord />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/reset" element={<Reset />}></Route>
          <Route path="/user/:USERID" element={<User type={"own"} />}></Route>
          <Route path="/friends" element={<Friends />}></Route>
          <Route path="/friends/:USERID" element={<Friends />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
