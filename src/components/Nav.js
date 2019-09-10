import React from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <Container>
      <Menu stackable>
        <Menu.Item>Hacker News</Menu.Item>
        <Menu.Item>
          <Link to="/">Top</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/ask">Ask</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/shows">Shows</Link>
        </Menu.Item>
      </Menu>
    </Container>
  );
};

export default Nav;
