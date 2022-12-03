import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavLink,
  Nav
} from 'reactstrap';

function Navigation() {

  const location = useLocation();
  const { pathname } = location;
  const isMatch = link => {
    return pathname.indexOf(link) > -1;
  }
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Advent of code</NavbarBrand>
      <Nav>
        <NavLink active={isMatch('2020')} href="/2020">2020</NavLink>
        <NavLink active={isMatch('2021')} href="/2021">2021</NavLink>
        <NavLink active={isMatch('2022') || pathname === '/'} href="/2022">2022</NavLink>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
