import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div id='home-container'>
      <div id='greeting'>
        <div>Welcome Name!</div>
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