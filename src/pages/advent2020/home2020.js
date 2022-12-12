import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { pages } from '../../pages/pagesConfig';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      defaultMessage: 'This is the message from class Home construction',
      totalBlocks: []
    };
  }

  render() {
    const { children } = pages[2020];
    return (
      <div>
        Advent of code 2020
        {
          children.map(page => {
            const { path, name } = page;
            return(
              <Link to={path} key={page}>{name}</Link>
            );
          })
        }
      </div>
    );
  }
}


export default Home;
 