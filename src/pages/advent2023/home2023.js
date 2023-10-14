import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { pages } from '../pagesConfig';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      defaultMessage: '2023 home page construction',
      totalBlocks: []
    };
  }

  render() {
    const { children } = pages[2023];

    return (
      <div>
        Advent of code 2023
        {
          children.map(page => {
            const { path, name } = page;
            return(
              <Link to={path} key={page}>{name}</Link>
            );
          })
        }
        YAY
      </div>
    );
  }
}


export default Home;
 