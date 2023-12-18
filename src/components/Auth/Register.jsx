import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { postRegister } from "../../services/apiservice";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const Register = (props) => {
  const navigate = useNavigate();
  //
  const handleRegister = async () => {
    let data = await postRegister(email, password, username);
    if (data && data.EC === 0) {
      toast.success(data.EM, {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
        autoClose: 2000,
        draggable: true,
      });
      localStorage.setItem("user", JSON.stringify(data.DT));
      navigate("/");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM, {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
        autoClose: 2000,
        draggable: true,
      });
    }
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  useEffect(() => {
    showPassword
      ? document
          .querySelector("input[type=password]")
          .setAttribute("type", "text")
      : document
          .querySelector("input[type=text]")
          .setAttribute("type", "password");
  }, [showPassword]);

  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <div className="Register-container">
      <div className="header">
        <span> have an account ?</span>
        <button onClick={()=>{navigate("/login")}} >Sign In</button>
        <span className="contact">Contact us</span>
      </div>
      <div className="Register-title">Quizzlet</div>
      <div className="welcome">Let Your Journey Begin</div>
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
          {/*  */}
          <label htmlFor="username">username</label>
          <input
            type={"username"}
            name="username"
            id=""
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <button
            onClick={handleRegister}
            className="btn btn-dark btn-Register"
          >
            Sign Up to Quizzlet
          </button>
          <div className="text-center">
            <span
              style={{ cursor: "pointer", textDecoration: "underline" }}
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
export default Register;
