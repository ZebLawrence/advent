import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "reactstrap";
import Nav from '../components/nav/nav';
import asyncComponent from '../components/asyncComponent/asyncComponent';
import { pages } from '../pages/pagesConfig';
import './App.scss';
import PageContainer from '../components/pageContainer/pageContainer';

class App extends Component {
  render() {

    return (
      <Router>
        <Container fluid>
          <PageContainer>
              <Nav/>
              <Routes>
                {
                  Object.keys(pages).map(pageKey => {
                    const page = pages[pageKey];
                    if (page.children) {
                      return page.children.map(childPage => {
                        const Component = asyncComponent(() => import(`../pages/${childPage.componentPath}`));
                        return(
                          <Route key={childPage.componentPath} exact path={childPage.path} element={<Component />}/>
                        );
                      })
                    } else {                      
                      const Component = asyncComponent(() => import(`../pages/${page.componentPath}`));
                      return(
                        <Route key={page.componentPath} exact path={page.path} element={<Component />}/>
                      );
                    }
                  })
                }
              </Routes>
          </PageContainer> 
          <footer className="d-flex justify-content-center">
            <a className="px-3" target="_blank" href="https://adventofcode.com/2022/leaderboard/private/view/1083410">Advent of Code Private Leaderboard</a>
            <a className="px-3" target="_blank" href="https://adventofcode.com/2020">2020</a>
            <a className="px-3" target="_blank" href="https://adventofcode.com/2021">2021</a>
            <a className="px-3" target="_blank" href="https://adventofcode.com/2022">2022</a>
          </footer>
        </Container>
      </Router>
    );
  }
}

export default App;
