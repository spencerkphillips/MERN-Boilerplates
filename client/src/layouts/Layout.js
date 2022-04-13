import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { authenticate, isAuth, logout } from '../auth/helpers.js';

const Layout = ({ children, match, history}) => {
  const isActive = path => {
    if(match.path == path) {
      return 'nav-link active'
    } else {
      return 'nav-link text-light'
    }
  }

  const nav = () => (
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link to="/" className={isActive('/')}>Home</Link>
      </li>
      {!isAuth() && (
        <Fragment>
          <li className="nav-item">
            <Link to="/register" className={isActive('/register')}>Register</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className={isActive('/login')}>Login</Link>
          </li>
        </Fragment>
      )}
      {isAuth() && (
        <Fragment>
          <li className="nav-item">
            <Link to="/profile" className={isActive('/profile')}>{isAuth().name}</Link>
          </li>
          <li className="nav-item">
            <span className="nav-link text-light" onClick={() => {logout(() => {history.push('/')})}}>Log Out</span>
          </li>
        </Fragment>
      )}
    </ul>
  )

  return (
    <Fragment>
      {nav()}
      <div className="container">
        {children}
      </div>
    </Fragment>
  );
}

export default withRouter(Layout);