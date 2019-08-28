import * as selectors from './selectors';
import { initialState } from './reducer';

describe('Top Stories - Selectors', () => {
  let state;

  beforeAll(() => {
    state = { ...initialState };
  });

  it('should return isLoading', () => {
    const isLoading = selectors.getIsLoading({ topStories: state });
    expect(isLoading).toEqual(state.isLoading);
  });

  it('should return isLoadingMore', () => {
    const isLoadingMore = selectors.getIsLoadingMore({ topStories: state });
    expect(isLoadingMore).toEqual(state.isLoadingMore);
  });

  it('should return ids', () => {
    const ids = selectors.getIds({ topStories: state });
    expect(ids).toEqual(state.ids);
  });

  it('should return items', () => {
    const items = selectors.getItems({ topStories: state });
    expect(items).toEqual(state.items);
  });

  it('should return error', () => {
    const error = selectors.getError({ topStories: state });
    expect(error).toEqual(state.error);
  });
});
