import './Header.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Library = (props) => {
  const googleBooksAPIKey = props.apiKey;
  const test = async () => {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=harry-potter&key=AIzaSyDYLvzacyDGmqhxYbqSFBLGa1F3OYY_cbU`);
    const data = await response.data;
    console.log(data.items);
  }
  return (
    <div id='container'>
      <div id='add-book'>
        <div onClick={test}>Here</div>
      </div>
    </div>
  )
}

export default Library;