import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";

import "../../styles/signup.css";

const ResetPAssword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [pswInput, setPswInput] = useState({
    password: null,
    retype_password: null,
  });

  const [status, setStatus] = useState({
    isLoading: false,
    message: null,
  });

  const passwrdInputHandler = (e) => {
    e.preventDefault();
    setPswInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    try {
      setStatus({
        isLoading: true,
        message: null,
      });

      const { data } = await axios.post(
        BASE_URL + "/user/password/update_password",
        {
          password: pswInput.password,
          id: state.id,
        }
      );
      console.log(data);

      setStatus({
        isLoading: false,
        message: data.message,
      });
      if (data.success) {
        setTimeout(() => {
          navigate("/user/login");
        }, 1500);
      }
    } catch (err) {
      setStatus({
        isLoading: false,
        message: err.message,
      });
    }
  };
  return (
    <div className={`signup-form reset-password`}>
      {status.isLoading && <p>loading...</p>}
      {status.message && (
        <p className="status-alert alert alert-dark">{status.message}</p>
      )}

      <form className="modal-content">
        <div>
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter your new password"
            name="password"
            id="password"
            autoComplete="on"
            required
            className="my-3"
            onChange={passwrdInputHandler}
          />
        </div>

        <div className="re-enter-password">
          <label htmlFor="retype_password">
            <b>Re-Enter Password</b>
          </label>
          <input
            type="password"
            placeholder="Re-Enter your password"
            name="retype_password"
            id="retype_password"
            autoComplete="on"
            required
            className="my-3"
            onChange={passwrdInputHandler}
          />
          {/* checking password and retype password if they ar not equal then it will show pass does not match */}
          {pswInput.retype_password ? (
            pswInput.password !== pswInput.retype_password ? (
              <p className=" my-1 p-1 bg-danger text-light rounded">
                Password Does Not Match
              </p>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <div className="clearfix">
            <button
              type="button"
              className="signupbtn"
              onClick={resetPasswordHandler}
            >
              Reset Password
            </button>
            <button type="button" className="signupbtn mt-2">
              <NavLink to={"/user/login"}> Cancel</NavLink>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPAssword;
