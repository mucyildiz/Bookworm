import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div id='header-container'>
      <div id='header-left'>
        <div id='title'>
          Bibliophili
        </div>
        <div id='header-tabs'>
          <Link to='/'>
            <div className='header-tab'>Home</div>
          </Link>
          <Link to='/my-books'>
            <div className='header-tab'>My Books</div>
          </Link>
          <Link to='/recommendations'>
            <div className='header-tab'>Get Recommendations</div>
          </Link>
        </div>
      </div>
      <div id='header-right'>
        <div id='user-options'>
          <div id='login'>Login</div>
        </div>
      </div>
    </div>
  )
}

export default Header;