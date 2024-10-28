import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink ,na, useNavigate} from 'react-router-dom';
import { deleteAllCookies, getCookie } from '../../cookies';
import { login,logout } from '../../action/login';
import { del } from '../../untils/request';
function Header() {
  const checkLogin = useSelector(state => state.loginReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=> {
    if(getCookie('token') && !checkLogin){
      dispatch(login())
    }
  },[])
  const handleLogout = () => {
    deleteAllCookies( )
    dispatch(logout())
    navigate('/login')
  }
  return (
    <Navbar expand="lg" className="header">
      <Container className='d-flex'>
        <Navbar.Brand className='logo'>Quiz</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='float-left'>
          {!checkLogin ? (
            <Nav className="ms-auto">
              <NavLink to="/login" className="nav-link" activeClassName ="active">Login</NavLink>
              <NavLink to="/register" className="nav-link" activeClassName="active">Register</NavLink>
            </Nav>
          ):
          (
            <>
              <Nav className="m-auto">
                <NavLink to="/" className="nav-link" activeClassName ="active">Home</NavLink>
                <NavLink to="/topic" className="nav-link" activeClassName="active">Topic</NavLink>
                <NavLink to="/answers" className="nav-link" activeClassName="active">Answers</NavLink>
              </Nav>
              <button onClick={handleLogout} className='btn btn-info'>Logout</button>
            </>
          )
        }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;