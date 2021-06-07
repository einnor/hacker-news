import React, { Component } from 'react';

export const FiltersContext = React.createContext();

export class FiltersProvider extends Component {
  state = {
    filter: 'time',
    sort: 'desc'
  };

  onFiltersChange = (args) => {
    this.setState({ ...args });
  };
  render() {
    const { filter, sort } = this.state;
    return (
      <FiltersContext.Provider
        value={{ filter, sort, onFiltersChange: this.onFiltersChange }}
      >
        {this.props.children}
      </FiltersContext.Provider>
    );
  }
}

export const FiltersConsumer = FiltersContext.Consumer;

export default { FiltersContext, FiltersProvider, FiltersConsumer };
