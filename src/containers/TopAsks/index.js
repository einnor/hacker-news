import React, { Component } from 'react';
import { Placeholder } from 'semantic-ui-react';
import Item from '../../components/Item';
import axios from '../../plugins/axios';
import CustomPagination from '../../components/CustomPagination';
import Filters from '../../components/Filters';
import Sort from '../../components/Sort';
import orderBy from 'lodash/orderBy';
import AppLayout from '../../components/AppLayout';
import {FiltersContext} from '../../context/FiltersContext';
class TopAsks extends Component {
  static contextType = FiltersContext;
  state = {
    questions: [],
    isLoading: true,
    isLoadingMore: true,
    activePage: 1,
    perPage: 10,
    allIds: [],
  };

  componentDidMount() {
    this.displayTopQuestions();
  }

  getQuestionDetails = (id) => axios.get(`/item/${id}.json`);

  displayTopQuestions = async () => {
    this.setState({ isLoading: true });
    const response = await axios.get(`/askstories.json`);
    const questionIds = response.data;
    this.setState({ isLoading: false, allIds: questionIds });
    this.displayTopQuestionsItems();
  };

  getNextItemIds = () => {
    const { activePage, perPage, allIds } = this.state;
    const startIndex = (activePage - 1) * perPage;
    const endIndex = startIndex + perPage;

    return allIds.slice(startIndex, endIndex);
  };

  displayTopQuestionsItems = async () => {
    const { filter, sort } = this.context;
    this.setState({ isLoadingMore: true });
    const questionTopIds = this.getNextItemIds();
    const questionDetails = questionTopIds.map(this.getQuestionDetails);
    const questionPromise = await Promise.all(questionDetails);
    const questions = questionPromise.map((res) => res.data);
    this.setState({
      questions: orderBy(questions, [filter], [sort]),
      isLoadingMore: false
    });
  };
  onPaginationChange = (activePage) => {
    this.setState(
      { activePage },
      async () => await this.displayTopQuestionsItems()
    );
  };

  onFilterChange = (e, { value }) => {
    const { questions } = this.state;
    const { sort, onFiltersChange } = this.context;
    onFiltersChange({ filter: value });
    this.setState({ questions: orderBy(questions, [value], [sort]) });
  };

  onSortChange = (e, { value }) => {
    const { questions } = this.state;
    const { filter, onFiltersChange } = this.context;
    onFiltersChange({ sort: value });
    this.setState({ questions: orderBy(questions, [filter], [value]) });
  };
  render() {
    const {
      questions,
      isLoading,
      isLoadingMore,
      allIds,
      perPage,
      activePage
    } = this.state;

    return (
      <AppLayout>
        {!isLoading ? (
          <div
            style={{
              display: 'flex',
              direction: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
              paddingBottom: 20,
              width: '100%'
            }}>
            <CustomPagination
              activePage={activePage}
              totalItems={allIds.length}
              perPage={perPage}
              onPaginationChange={this.onPaginationChange}
            />
            <Filters onFilterChange={this.onFilterChange} />
            <Sort onSortChange={this.onSortChange} />
          </div>
        ) : null}
        {isLoading || isLoadingMore
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <div
                key={item}
                style={{
                  borderBottom: '1px solid rgba(0, 0, 0, .3)',
                  paddingBottom: 20,
                  paddingTop: 20
                }}>
                <Placeholder fluid>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                </Placeholder>
              </div>
            ))
          : questions.map((question) => (
              <Item key={question.id} item={question} />
            ))}
        {!isLoading ? (
          <CustomPagination
            totalItems={allIds.length}
            perPage={perPage}
            activePage={activePage}
            onPaginationChange={this.onPaginationChange}
          />
        ) : null}
      </AppLayout>
    );
  }
}
export default TopAsks;
