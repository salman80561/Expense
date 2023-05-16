import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import LoginForm from "./Components/Auth/LoginForm";
import RegistrationForm from "./Components/Auth/RegistrationForm";
import Profile from "./Components/Profile/Profile";
import Layout from "./Components/Layout/Layout";
import ForgetPassword from "./Components/Auth/ForgetPassword";
import Expenses from "./Components/Expenses/Expenses";
import { ThemeContext } from "./Components/Context/ThemeContext";

function App() {
  const amount = useContext(ThemeContext);
  const style = {
    light: {
      color: "black",
      background: "white",
    },
    dark: {
      color: "white",
      background: "black",
    },
  };

  const isLogin = useSelector((state) => state.auth.isLoggedin);
  console.log(isLogin);

  return (
    <div>
      <Layout>
        <Routes>
          {!isLogin && <Route path="/" element={<Navigate to="login" />} />}
          {!isLogin && <Route path="/login" element={<LoginForm />} />}
          {!isLogin && (
            <Route path="/register" element={<RegistrationForm />} />
          )}
          {!isLogin && (
            <Route path="/forget" element={<ForgetPassword />} />
          )}
          {isLogin && <Route path="/home" element={<Home />} />}
          <Route
            path="/profile"
            element={isLogin ? <Profile /> : <Navigate to="/login" />}
          />
          {isLogin && <Route path="/expense" element={<Expenses />} />}
          {!isLogin && <Route path="*" element={<Navigate to="/login" />} />}
          {isLogin && <Route path="*" element={<Navigate to="/home" />} />}
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
