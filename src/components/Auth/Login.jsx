import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { postLogin } from "../../services/apiservice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLoginSucces } from "../../redux/action/authAction";
import { LiaSpinnerSolid } from "react-icons/lia";
import { Navigate } from "react-router-dom";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //
  const handleLogin = async () => {
    setIsLoading(true);
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      //shoot the data to redux
      dispatch(userLoginSucces(data));
      
      toast.success(data.EM, {
        position: toast.POSITION.TOP_CENTER,
        className: "foo-bar",
        autoClose: 2000,
        draggable: true,
      });
        setIsLoading(false);
      navigate("/");
      
    }
    if (data && data.EC !== 0) {
      setTimeout(() => {
        toast.error(data.EM, {
          position: toast.POSITION.TOP_RIGHT,
          className: "foo-bar",
          autoClose: 2000,
          draggable: true,
        });
        setIsLoading(false);
      },2000)
    }
  };
  useEffect(() => {
    document
      .querySelector(showPassword ? "input[type=password]" : "input[type=text]")
      ?.setAttribute("type", showPassword ? "text" : "password");
  }, [showPassword]);
  function handleGoBack() {
    // Navigate to the home page
    navigate("/");
  }
  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button onClick={() => navigate("/register")}>Sign Up</button>
        <span className="contact">Contact us</span>
      </div>
      <div className="login-title">Quizzlet</div>
      <div className="welcome">Hello, who’s this?</div>
      <div className="content-form container-fluid col-4 ">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            name="email"
            id=""
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <span className="input-password">
            <input
              type={"password"}
              name="password"
              id=""
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword && (
              <FaEye
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
                className="eye"
              />
            )}
            {!showPassword && (
              <FaEyeSlash
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
                className="eye"
              />
            )}
          </span>
          <div>
            <span className="forgot">Forgot Password?</span>
          </div>
          <button
            disabled={isLoading}
            onClick={handleLogin}
            className="btn btn-dark btn-login"
          >
            {isLoading && (
              <LiaSpinnerSolid
                className="spinner"
                style={{ marginRight: "3px" }}
              />
            )}
            <span>Sign In to Quizzlet</span>
          </button>
          <div className="text-center">
            <span
              style={{ cursor: "pointer",  }}
              onClick={() => handleGoBack()}
            >
              {" "}
              Go back to homepage
            </span>
          </div>
          <div className="divider container-fluid"></div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};
export default Login;
