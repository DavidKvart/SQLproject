import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './../context/authContext';
import { useContext } from 'react';
import jwt from 'jwt-decode';
import axios from 'axios';
import { stripBasename } from '@remix-run/router';
const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const decoded = jwt(user);
      axios
        .post('http://localhost:3000/api/users/getById', decoded)
        .then((res) => {
          console.log(res.data);
          setName(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);
  return (
    <header className="p-3 mb-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
            <svg
              className="bi me-2"
              width="40"
              height="32"
              role="img"
              aria-label="Bootstrap"></svg>

            <img
              id="logo"
              style={{ width: '8vw' }}
              src="/images/logo.png"
              alt=""
            />
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            {user && (
              <>
                <li>
                  <Link to="/user/browse" className="nav-link px-2 link-dark">
                    Browse
                  </Link>
                </li>
                <li>
                  <Link to="/user/home" className="nav-link px-2 link-dark">
                    My profile
                  </Link>
                </li>
              </>
            )}
          </ul>

          {user && (
            <article style={{ paddingRight: '1rem' }}>
              Hello {name && name?.userData?.name} !
            </article>
          )}

          {!user ? (
            <Link className="nav-link px-2 link-dark" to="/login">
              Login
            </Link>
          ) : (
            <button
              type="button"
              class="btn btn-light"
              onClick={() => {
                localStorage.removeItem('token');
                setUser('');
                navigate('/');
              }}>
              Logout
            </button>
          )}

          <div className="dropdown text-end">
            <Link
              to="#"
              className="d-block link-dark text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <img
                src="/images/avatar.jpeg"
                alt="mdo"
                width="32"
                height="32"
                className="rounded-circle"></img>
            </Link>
            <ul className="dropdown-menu text-small">
              <li>
                <Link className="dropdown-item" to="#">
                  New project...
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Settings
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Profile
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider"></hr>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
