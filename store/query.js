import { Store } from 'pullstate';

const QueryStore = new Store({
  query: 'Imagine Dragons',
  queryType: 'artist',
  search: '',
});

// TODO: Implement search and filter
export const setSearch = (search) => {
  QueryStore.update((s) => {
    s.search = search;
  });
};

export default QueryStore;
