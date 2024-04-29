import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userLogout } from "../../redux/action/authAction";
import { postUserLogOut } from "../../services/apiservice";
import { useTranslation } from "react-i18next";

import { useState } from "react";
import Language from "./language";
import ModalUserProfile from "./ModalUserProfile";
const Header = () => {
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(false);
  const email = useSelector((state) => state.user.account.email);
  const refresh_token = useSelector(
    (state) => state.user.account.refresh_token
  );
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  // console.log(isAuthenticated, account);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/Login");
  };
  const handleRegister = () => {
    navigate("/Register");
  };
  const handleLogOut = async () => {
    let res = await postUserLogOut(email, refresh_token);
    if (res && res.EC === 0) {
      dispatch(userLogout());
      toast.warning(res.EM, {
        position: toast.POSITION.TOP_LEFT,
        className: "foo-bar",
        autoClose: 2000,
        draggable: true,
        theme: "dark",
      });
      navigate("/");
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM, {
        position: toast.POSITION.TOP_LEFT,
        className: "foo-bar",
        autoClose: 2000,
        draggable: true,
        theme: "dark",
      });
    }
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand className="nav-link ">
            <NavLink className="navbar-brand " to="/">
              Quizzlet
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav-link " to="/">
                {t("header.Home")}
              </NavLink>
              <NavLink className=" nav-link" to="/user">
                {t("header.User")}
              </NavLink>
              <NavLink className=" nav-link" to="/Admin">
                {t("header.Admin")}
              </NavLink>
            </Nav>
            <Nav>
              <span id="basic-nav-dropdown">
                {/* change language */}
                <Language />
              </span>
              {isAuthenticated && account ? (
                <NavDropdown
                  title={`Welcome,${account.username}`}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item onClick={() => handleLogOut()}>
                    {" "}
                    Log Out
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => setShow(true)}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>Separated link</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <div>
                  <button
                    onClick={() => handleLogin()}
                    className="btn btn-login"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => handleRegister()}
                    className="btn btn-signup"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalUserProfile show={show} onHide={() => setShow(false)} />
    </>
  );
};
export default Header;
