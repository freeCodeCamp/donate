import React from 'react';
import FCCSearch from 'react-freecodecamp-search';

import NavLogo from './components/NavLogo';
import UserState from './components/UserState';

import './header.css';

function Header() {
  return (
    <header>
      <nav id='top-nav' style={{ height: '50px'}}>
        <a className='home-link' href='https://www.freecodecamp.org'>
          <NavLogo />
        </a>
      </nav>
    </header>
  );
}

export default Header;
