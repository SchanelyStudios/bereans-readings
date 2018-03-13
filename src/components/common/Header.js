import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import './Header.css';

const Header = () => {
    return (
      <header className="Header">
        <img src={logo} className="Header-logo" alt="logo" />
        <h1 className="Header-title">Berans Recommended Readings</h1>
        <nav>
          <ul>
            <li><Link to={'/'}>Latest Headlines</Link></li>
            <li><Link to={'/recommended'}>Recommended Readings</Link></li>
          </ul>
          <Link className="Add-article" to={'/add'}>+ Article</Link>
        </nav>
      </header>
    );
}
export default Header;
