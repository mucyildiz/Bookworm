import './Home.css';
import { Link } from 'react-router-dom';

const Home = (props) => {
  const renderHome = () => {
    if(props.name) {
      return (
        <div id='home-container'>
          <div id='greeting'>
            <div>Welcome {props.name}!</div>
          </div>
          <div id='options'>
            <Link to="/my-books">
              <div className='option'>
                <img className='option-img' src='/images/bookreader2.svg' alt='library'/>
                <div className='option-text'>Go to library</div>
              </div>
            </Link>
            <Link to='/searchresults/'>
              <div className='option'>
                <img className='option-img' src='/images/bookreader1.svg' alt='find books' />
                <div className='option-text'>Find Books</div>
              </div>
            </Link>
          </div>
        </div>
      )
    }
    return (
      <div id='home-container'>
        <h2 id='logged-out-msg'>To log in and start finding new books, simply press the button at the top right and sign in with your Google account!</h2>
        <img id='guy-sitting-img' src='/images/bookreader3.svg' alt='man sitting on large books reading a much smaller book' />
      </div>
    )
  }
  return renderHome();
}

export default Home;