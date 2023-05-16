import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/auth";

const Navigation = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authAction.logout());
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to the "/login" route after logout
  };

  return (
    <header className="header">
      <Link to="/" className="r">
        <div className="logo">Expense Tracker</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li className="rahul">
              <Link to="/login">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li className="rahul">
              <Link to="/Home">Home</Link>
            </li>
          )}
          {isLoggedIn && (
            <li className="rahul">
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li className="rahul">
              <Link to="/expense">Expenses</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
