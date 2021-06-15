import './Home.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/getuser');
      const userInfo = await response.data;
      setUser({
        firstName: userInfo.firstName,
        id: userInfo._id
      });
    };
    fetchData();
  }, [])

  return (
    <div id='home-container'>
      <div id='greeting'>
        <div>Welcome {user.firstName}!</div>
        <div>You have x books in your library.</div>
      </div>
      <div id='options'>
        <Link to="/my-books">
          <div className='option'>
            <img className='option-img' src='/images/bookreader2.svg' alt='library'/>
            <div className='option-text'>Go to library</div>
          </div>
        </Link>
        <Link to='/recommendations'>
          <div className='option'>
            <img className='option-img' src='/images/bookreader1.svg' alt='find books' />
            <div className='option-text'>Find Books</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Home;