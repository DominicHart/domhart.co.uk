import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import { logout } from '../api/User';

const Nav: React.FC = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false),
    navigate = useNavigate();
  const user = useUser();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout().then(() => {
      localStorage.removeItem('token');
      location.href = '/';
    }).catch(() => {
      console.log('An error occurred while logging out');
    })
  }

  const toggleNav = (e: React.MouseEvent<HTMLButtonElement>) => {
    setNavOpen(prevNavOpen => !prevNavOpen);
  }

  const goToLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    setNavOpen(false);
    navigate(href);
  }

  let logoutLink = <button type="button" onClick={handleLogout} className="text-code-yellow">Logout();</button>;

  return (
    <div>
      <nav className={"fixed top-0 left-0 bg-code-dark-gray w-full p-4 h-20 z-20 text-center"}>
        <button type="button" onClick={toggleNav} className="block absolute right-8 top-7 text-code-yellow">
          <span className={`block bg-white h-0.5 ${navOpen ? "relative rotate-45 top-[10px] w-8" : "w-6"}`} />
          {!navOpen && (
            <span className="block bg-white w-6 h-0.5 mt-2" />
          )}
          <span className={`block bg-white h-0.5 ${navOpen ? "relative -rotate-45 top-[6px] w-8" : "w-6 mt-2"}`} />
        </button>
        <h1 className="block font-semibold text-2xl w-18 absolute z-5 m-0 left-8 top-1/2 -translate-y-1/2 text-code-blue">
          <Link to="/">Dom Hart</Link>
        </h1>
      </nav>
      {navOpen &&
        <nav className="block bg-code-dark-gray w-full fixed z-50 left-0 top-[80px] px-8 h-full">
          <ul className="md:text-center text-lg md:text-2xl font-medium text-white md:relative md:top-52">
            <li className="block">
              <Link className="block py-2" onClick={goToLink} to="/">
                <img src="../../images/logos/react.png" className="inline-block align-middle h-4 w-auto mr-3" />
                <span className="inline-block align-middle">Home.tsx</span>
              </Link>
            </li>
            <li className="block mt-4">
              <Link className="block py-2" onClick={goToLink} to="/about">
                <img src="../../images/logos/react.png" className="inline-block align-middle h-4 w-auto mr-3" />
                <span className="inline-block align-middle">Career.tsx</span>
              </Link>
            </li>
            <li className="block mt-4">
              <Link className="block py-2" onClick={goToLink} to="/portfolio">
                <img src="../../images/logos/react.png" className="inline-block align-middle h-4 w-auto mr-3" />
                <span className="inline-block align-middle">Portfolio.tsx</span>
              </Link>
            </li>
            <li className="block mt-4">
              <Link className="block py-2" onClick={goToLink} to="/photos">
                <img src="../../images/logos/react.png" className="inline-block align-middle h-4 w-auto mr-3" />
                <span className="inline-block align-middle">Photos.tsx</span>
              </Link>
            </li>
            {user.user &&
              <li className="block mt-6">
                {logoutLink}
              </li>
            }
          </ul>
        </nav>
      }
    </div>
  );
};

export default Nav;