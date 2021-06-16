import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Library from './Library';
import Recommendations from './Recommendations';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/getuser');
      const userInfo = await response.data;
      setUserName(userInfo.firstName);
    };
    fetchData();
  }, [])

  return (
    <div id='app-container'>
      <BrowserRouter>
        <div>
          {/* if we have userName, we are authed */}
          <Header isAuthed={userName}/>
          <Route exact path="/" render={() => (
            <Home name={userName} />
          )} />
          <Route exact path="/my-books" component={Library} />
          <Route exact path='/recommendations' component={Recommendations} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
