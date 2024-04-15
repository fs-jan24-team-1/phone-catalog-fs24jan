import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const Header = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <>
      <div className="logo">
        <Link to="/">Logo</Link>
      </div>

      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
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
        </div>
      </nav>

      <div className="left-side">
        <NavLink className={getLinkClass} to="/favourites">
          Favourites
        </NavLink>
        <NavLink className={getLinkClass} to="/cart">
          Cart
        </NavLink>
      </div>
    </>
  );
};
