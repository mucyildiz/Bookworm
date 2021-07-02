import './Header.css';
import Search from './Search';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <div id='header-container'>
      <div id='header-left'>
        <Link to='/'>
        <div id='title'>Bibliophili</div>
        </Link>
        {props.isAuthed && 
        <>
          <div id='header-tabs'>
            <Link to='/my-books'>
              <div className='header-tab'>My Books</div>
            </Link>
            <Link to='/recommendations'>
              <div className='header-tab'>Get Recommendations</div>
            </Link>
          </div>
        </>
        }
      </div>
      <div id='header-right'>
      <Search id='search-bar' googleAPIKey={props.apiKey} />
        <div id='user-options'>
          <div className='btn'>
            {props.isAuthed ? 
            <a href='/api/logout'>
              <div id='login-content'>
                <span>Log out</span>
              </div>
            </a> :
            <a href='/auth/google'>
              <div id='login-content'>
                <img className='google-logo' src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' alt='' />
                <span>
                Login with Google
                </span>
              </div>
            </a>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;