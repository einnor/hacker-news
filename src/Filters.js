import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const options = [
  {
    key: 'time',
    text: 'Date Published',
    value: 'time',
  },
  {
    key: 'score',
    text: 'Article Rank',
    value: 'score',
  },
  {
    key: 'descendants',
    text: 'Comments',
    value: 'descendants',
  },
]

const Filters = ({ onFilterChange }) => (
  <span>
    <Dropdown
      inline
      options={options}
      defaultValue={options[0].value}
      onChange={onFilterChange}
    />
  </span>
);

export default Filters;
