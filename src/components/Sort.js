import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const options = [
  {
    key: 'asc',
    text: 'Asc',
    value: 'asc'
  },
  {
    key: 'desc',
    text: 'Desc',
    value: 'desc'
  }
];

const Sort = ({ onSortChange }) => (
  <span>
    <Dropdown
      inline
      options={options}
      defaultValue={options[1].value}
      onChange={onSortChange}
    />
  </span>
);

export default Sort;
