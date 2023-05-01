import logo from './logo.svg';
import { InfiniteList } from './InfiniteList'
import './App.css';

/**
 * Infinite Scrolling List

In this exercise, the candidate has to create an infinite scrolling list of items. When the user scrolls down, more items should be fetched and displayed. The candidate should implement the following features:

- Fetch data from an API (e.g., https://jsonplaceholder.typicode.com/posts).
- Display the fetched data as a list of items.
- Implement infinite scrolling: when the user scrolls to the bottom of the list, fetch more data     and add it to the list.
 */

function App() {
  return (
    <div className="App">
        <InfiniteList/> 
    </div>
  );
}

export default App;
