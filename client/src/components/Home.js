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
            <img id='option-img' src='https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?cs=srgb&dl=pexels-janko-ferlic-590493.jpg&fm=jpg' alt='library'/>
            <div id='option-text'>Go to library</div>
          </div>
        </Link>
        <Link to='/recommendations'>
          <div className='option'>
            <img id='option-img' src='https://images.pexels.com/photos/2908773/pexels-photo-2908773.jpeg?cs=srgb&dl=pexels-oladimeji-ajegbile-2908773.jpg&fm=jpg' alt='find books' />
            <div id='option-text'>Find Books</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Home;