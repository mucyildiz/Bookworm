import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Library from './Library';
import SearchResults from './SearchResults';
import BookInfo from './BookInfo';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [userName, setUserName] = useState('');
  const [googleAPIKey, setGoogleAPIKey] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/getuser');
      const userInfo = await response.data;
      setUserName(userInfo.firstName);
      const googleAPIResponse = await axios.get('/api/getGoogleAPIKey');
      const googleAPIKeyData = await googleAPIResponse.data;
      setGoogleAPIKey(googleAPIKeyData);
    };
    fetchData();
  }, []);


  return (
    <div id='app-container'>
      <BrowserRouter>
        <div>
          {/* if we have userName, we are authed */}
          <Header apiKey={googleAPIKey} isAuthed={userName}/>
          <Route exact path="/" render={() => (
            <Home name={userName} />
          )} />
          <Route exact path="/my-books" render={() => (
            <Library name={userName} apiKey={googleAPIKey} />
          )} />
          <Route path='/searchresults/' render={() => (
            <SearchResults apiKey={googleAPIKey} />
          )} />
          <Route path='/book/' component={BookInfo} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
