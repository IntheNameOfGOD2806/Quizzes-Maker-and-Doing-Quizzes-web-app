import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet, Link, NavLink ,useNavigate} from "react-router-dom";
const Header = () => {
  const navigate=useNavigate();
  const handleLogin=()=>{
    
    navigate('/Login');
  }
  return (
    <>
      <Navbar  expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand className="nav-link ">
            <NavLink className="navbar-brand " to="/">Quizzlet</NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav-link " to="/">Home</NavLink>
              <NavLink className=" nav-link" to="/User">User</NavLink>
              <NavLink className=" nav-link" to="/Admin">Admin</NavLink>
            </Nav>
            <Nav>
              {/* <Link to="/Login"> 
               
              </Link> */}
             <button onClick={() => handleLogin()}  className='btn btn-login'>
                Log In
              </button>
              <button className='btn btn-signup'>
                Sign Up
              </button>
              {/* <NavDropdown  title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item >Log In</NavDropdown.Item>
                <NavDropdown.Item >
                  Log Out
                </NavDropdown.Item>
                <NavDropdown.Item >Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item >
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default Header;