import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavLink,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import {
  pages
} from '../../pages/pagesConfig';

function Navigation() {

  const location = useLocation();
  const { pathname } = location;
  const isMatch = link => {
    return pathname.indexOf(link) > -1;
  }

  const dropdowns = [];

  Object.keys(pages).forEach(key => {
    const { children } = pages[key];
    if (children) {
      dropdowns.push(
        <UncontrolledDropdown size="sm" key={key} setActiveFromChild>
          <DropdownToggle
            size="sm"
            className="nav-link"
            tag="a"
            // href={`/${key}`}
            caret
            color="primary">
            {key}
          </DropdownToggle>
          <DropdownMenu>
            {
              children.map((childPage, index) => {
                const { path, name } = childPage;
                const pageKey = `${path}-${index}`;
                return (
                  <DropdownItem
                    size="sm"
                    key={pageKey}
                    active={isMatch(path)}
                    href={path}
                    tag="a">
                    {name}
                  </DropdownItem>
                );
              })
            }
          </DropdownMenu>
        </UncontrolledDropdown>      
      );
    }
  });

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Advent of code</NavbarBrand>
      <Nav>
        {/* <NavLink active={isMatch('2020')} href="/2020">2020</NavLink>
        <NavLink active={isMatch('2021')} href="/2021">2021</NavLink>
        <NavLink active={isMatch('2022') || pathname === '/'} href="/2022">2022</NavLink> */}
        {dropdowns}

      </Nav>
    </Navbar>
  );
};

export default Navigation;
