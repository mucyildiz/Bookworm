import './Library.css';
import Search from './Search';
import axios from 'axios';

const Library = (props) => {
  const googleBooksAPIKey = props.apiKey;

  const test = async () => {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=harry-potter&key=AIzaSyDYLvzacyDGmqhxYbqSFBLGa1F3OYY_cbU`);
    const data = await response.data;
    console.log(data.items);
  }

  return (
    <div id='library-container'>
      <Search id='search-bar' key={googleBooksAPIKey} />
    </div>
  )
}

export default Library;