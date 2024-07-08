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
    logoutLink = <button type="button" onClick={logout}></button>;
  }
  
  return (
    <nav className="bg-code-dark-gray w-full p-4 h-28 relative text-center">
      <h1 className="block font-semibold text-2xl w-18 absolute z-5 left-8 top-1/2 -translate-y-1/2 text-code-blue">
        <Link to="/">Dom Hart</Link>
      </h1>
      <ul className="inline-block relative top-1/2 -translate-y-1/2 text-center p-0 text-md font-medium text-code-green">
        <li className="inline-block">
          <Link className="block py-4 hover:text-white" to="/">Home.tsx</Link>
        </li>
        <li className="inline-block ml-8">
          <Link className="block py-4" to="/photos">Photos.tsx</Link>
        </li>
        <li className="inline-block ml-8">
          <Link className="block py-4" to="/contact">Contact.tsx</Link>
        </li>
      </ul>
      { logoutLink }
    </nav>
  );
};

export default Nav;