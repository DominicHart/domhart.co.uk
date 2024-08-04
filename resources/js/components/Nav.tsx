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

  const toggleMobileNav = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      <nav className="fixed top-0 left-0 md:relative bg-code-dark-gray w-full p-4 h-28 z-20 text-center h-[112px]">
        {!navOpen &&
          <button type="button" onClick={toggleMobileNav} className="block md:hidden absolute right-8 top-11 text-code-yellow">OpenNav();</button>
        }
        <h1 className="block font-semibold text-2xl w-18 absolute z-5 m-0 left-8 top-1/2 -translate-y-1/2 text-code-blue">
          <Link to="/">Dom Hart</Link>
        </h1>
        <ul className="hidden md:inline-block relative top-1/2 -translate-y-1/2 text-center p-0 text-md font-medium text-code-green">
          <li className="inline-block">
            <Link className="block py-4 hover:text-white" to="/">Home.tsx</Link>
          </li>
          <li className="inline-block ml-4 lg:ml-8">
            <Link className="block py-4 hover:text-white" to="/about">About.tsx</Link>
          </li>
          <li className="inline-block ml-4 lg:ml-8">
            <Link className="block py-4 hover:text-white" to="/portfolio">Portfolio.tsx</Link>
          </li>
          <li className="inline-block ml-4 lg:ml-8">
            <Link className="block py-4 hover:text-white" to="/photos">Photos.tsx</Link>
          </li>
        </ul>
        {user.user &&
          <div className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2">
            {logoutLink}
          </div>
        }
      </nav>
      {navOpen &&
        <nav className="block md:hidden bg-code-dark-gray w-full fixed z-50 left-0 top-[112px] px-8 h-full">
          <button type="button" onClick={toggleMobileNav} className="block md:hidden absolute right-8 top-[-70px] text-code-yellow">CloseNav();</button>
          <ul className="text-left text-md font-medium text-white">
            <li className="inline-block">
              <Link className="block py-2" onClick={goToLink} to="/">
                <img src="../../images/logos/react.png" className="inline-block align-middle h-3 w-auto mr-3" />
                <span className="inline-block align-middle">Home.tsx</span>
              </Link>
            </li>
            <li className="block mt-4">
              <Link className="block py-2" onClick={goToLink} to="/about">
                <img src="../../images/logos/react.png" className="inline-block align-middle h-3 w-auto mr-3" />
                <span className="inline-block align-middle">About.tsx</span>
              </Link>
            </li>
            <li className="block mt-4">
              <Link className="block py-2" onClick={goToLink} to="/portfolio">
                <img src="../../images/logos/react.png" className="inline-block align-middle h-3 w-auto mr-3" />
                <span className="inline-block align-middle">Portfolio.tsx</span>
              </Link>
            </li>
            <li className="block mt-4">
              <Link className="block py-2" onClick={goToLink} to="/photos">
                <img src="../../images/logos/react.png" className="inline-block align-middle h-3 w-auto mr-3" />
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