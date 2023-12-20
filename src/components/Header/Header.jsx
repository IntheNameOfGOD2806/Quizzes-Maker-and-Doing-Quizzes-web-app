import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
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
                Home
              </NavLink>
              <NavLink className=" nav-link" to="/User">
                User
              </NavLink>
              <NavLink className=" nav-link" to="/Admin">
                Admin
              </NavLink>
            </Nav>
            <Nav>
              {isAuthenticated && account ? (
                <NavDropdown
                  title={`Welcome ${account.username}`}
                  id="basic-nav-dropdown"
                >
                 
                  <NavDropdown.Item>Log Out</NavDropdown.Item>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
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
    </>
  );
};
export default Header;
