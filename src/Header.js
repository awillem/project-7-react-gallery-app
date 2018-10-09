import React from 'react';
import Nav from './Nav';
import SearchForm from './SearchForm';

const Header = (props) => {
    return (
      <div>
        <SearchForm onSearch={props.onSearch} />
        
        <Nav />
      </div>
      
    );
}

export default Header;