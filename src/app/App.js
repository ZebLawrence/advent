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
        <PageContainer>
          <Container>
            <Nav/>
            <Routes>
              {
                Object.keys(pages).map(pageKey => {
                  const page = pages[pageKey];
                  const Component = asyncComponent(() => import(`../pages/${page.componentPath}`));
                  return(
                    <Route key={page.componentPath} exact path={page.path} element={<Component />}/>
                  );
                })
              }
            </Routes>
          </Container>
        </PageContainer> 
      </Router>
    );
  }
}

export default App;
