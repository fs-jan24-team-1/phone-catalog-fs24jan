import { Link, NavLink } from 'react-router-dom';
import './header.scss';
import classNames from 'classnames';

export const Header = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <div className="header">
      <div className="header__container">
        <div className="logo">
          <Link to="/">Logo</Link>
        </div>

        <nav data-cy="nav" className="navbar">
          <div className="navbar-brand">
            <NavLink className={getLinkClass} to="/">
              Home
            </NavLink>
            <NavLink className={getLinkClass} to="/phones">
              Phones
            </NavLink>
            <NavLink className={getLinkClass} to="/tablets">
              Tablets
            </NavLink>
            <NavLink className={getLinkClass} to="/accessories">
              Accessories
            </NavLink>
          </div>
        </nav>
      </div>

      <div className="right-side">
        <NavLink className={getLinkClass} to="/Favorites">
          Favourites
        </NavLink>
        <NavLink className={getLinkClass} to="/cart">
          Cart
        </NavLink>
      </div>
    </div>
  );
};
