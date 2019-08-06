import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const Nav = () => {
  return (
    <Menu stackable>
      <Menu.Item>
        Hacker News
      </Menu.Item>
      <Menu.Item>
        <Link to="/">
          Top
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/ask">
          Ask
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/jobs">
          Jobs
        </Link>
      </Menu.Item>
    </Menu>
  )
};

export default Nav;
