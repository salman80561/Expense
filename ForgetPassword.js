import React, { useRef } from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const emailRef = useRef();

  const sendLink = (e) => {
    e.preventDefault();
    const registeredMail = emailRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyABV3Ka88_JCZGivdh4xR89-n-S_BkTf1I",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: registeredMail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          response.json().then((data) => {
            let errorMessage = "Authotication Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage)
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <form onSubmit={sendLink} className="form">
        <h2>Forgot Password</h2>
        <i>Enter your registered email.</i>
        <div className="form-body">
          <input type="email" id="email" placeholder="Enter Registered Email" ref={emailRef} />
        </div>
        <button type="submit" className="btn">
          Send link
        </button>
        <p>
          Already a user? <Link to="/login">login</Link>
        </p>
      </form>
    </>
  );
};

export default ForgetPassword;