import './Library.css';
import Search from './Search';

const Library = (props) => {
  const googleBooksAPIKey = props.apiKey;

  return (
    <div id='library-container'>
      <Search id='search-bar' googleAPIKey={googleBooksAPIKey} />
    </div>
  )
}

export default Library;