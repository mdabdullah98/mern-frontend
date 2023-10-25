import React, { useState } from "react";

import { useNavigate, NavLink } from "react-router-dom";

import { BASE_URL } from "../../utils/utils";

import axios from "axios";

import "../../styles/signup.css";

const Verify = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({
    isLoading: false,
    message: null,
    userId: null,
  });

  // const getIsactive = async () => {
  //   const { data } = await axios(
  //     BASE_URL + `/user/password/authenticate_link/${id}`
  //   );

  //   const isActive = data.isActive;
  //   if (isActive) {
  //     setIsActive(isActive);
  //   } else {
  //     setStatus({
  //       status: true,
  //       statusTxt:
  //         "Link is already been used Please generate new fresh link to reset your password",
  //     });
  //   }
  // };

  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };

  const verifyMailHandler = async (e) => {
    e.preventDefault();

    try {
      setStatus({
        isLoading: true,
      });
      const { data } = await axios.post(
        BASE_URL + "/user/password/email_verification",
        { email }
      );

      setStatus({
        isLoading: false,
        message: data.message,
        userId: data.userId,
      });

      if (data.success) {
        setTimeout(() => {
          navigate(`/user/password/updatePassword`, {
            state: { id: data.userId },
          });
        }, 1500);
      }
    } catch (err) {
      setStatus({
        isLoading: false,
        message: err.message,
        userId: null,
      });
    }
  };

  return (
    <>
      <div className="signup-form reset-password ">
        {/* <div className="w1-00 d-flex justify-content-end align-items-center mx-3">
          <span
          className="close-btn-resetPasword fs-3"
          title="close"
          onClick={closeResetPswHandler}
          >
          <AiOutlineCloseCircle />
          </span>
        </div> */}
        {status.isLoading && <p className="alert alert-dark">loading...</p>}
        {status.message && (
          <p className="status-alert alert alert-dark">{status.message}</p>
        )}

        <form className="modal-content">
          <div className="container">
            <h6 className="my-4">Recover your password</h6>

            <div>
              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                id="email"
                autoComplete="on"
                required
                className="my-3"
                onChange={emailInputHandler}
              />
            </div>
          </div>

          <div className="clearfix">
            <button
              hidden={email ? false : true}
              type="button"
              className="signupbtn"
              onClick={verifyMailHandler}
            >
              Verify Your Email
            </button>

            <button type="button" className="signupbtn mt-2">
              <NavLink to={"/user/login"}> Cancel</NavLink>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Verify;
