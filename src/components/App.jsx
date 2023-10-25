import Home from "./home/Home";

import Login from "./pages/login";

import ResetPAssword from "./pages/resetPassword";

import Signup from "./pages/signup";

import Verify from "./pages/veirfy";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/user/signup" element={<Signup />}></Route>
          <Route path="/user/login" element={<Login />}></Route>
          <Route path="/user/password/emailverify" element={<Verify />}></Route>
          <Route
            path="/user/password/updatePassword"
            element={<ResetPAssword />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
