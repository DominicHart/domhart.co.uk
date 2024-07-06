import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link} from 'react-router-dom';

const Nav: React.FC = () => {
  const user = useContext(UserContext);

  const logout = (e) => {
    e.preventDefault();
  }

  let logoutLink = null;

  if (user) {
    logoutLink = <button type="button" onClick={logout}></button>
  }
  
  return (
    <nav className="bg-white w-full p-4 h-28">
      <h1 className="inline-block font-semibold text-2xl">Dom Hart</h1>
      <ul className="text-center">
        <li className="inline-block">
          <Link to="/">Home</Link>
        </li>
        <li className="inline-block ml-4">
          <Link to="/portfolio">Portfolio</Link>
          { logoutLink }
        </li>
      </ul>
    </nav>
  );
};

export default Nav;