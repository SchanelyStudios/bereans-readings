import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <Link className="navbar-brand" to={'/'}>Bereans Recommended Readings</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item"><Link to={'/'} className="nav-link">Latest Headlines</Link></li>
          <li className="nav-item"><Link to={'/recommended'} className="nav-link">Recommended Readings</Link></li>
        </ul>
        <span className="navbar-text my-auto">
          <Link className="btn btn-success" to={'/article/0'}>+ Article</Link>
        </span>
      </div>
    </nav>
  );
}
export default Header;
