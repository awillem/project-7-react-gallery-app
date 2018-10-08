import React from 'react';
import Nav from './Nav';
import SearchForm from './SearchForm';

const Header = (props) => {
    return (
      <div>
        <SearchForm onSearch={props.onSearch} />
        
        <Nav 
          cats={props.cats}
          dogs={props.dogs}
          computers={props.computers}
        />
      </div>
      
    );
}

export default Header;