import './Header.css';
import Search from './Search';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const Header = (props) => {
  return (
    <div id='header-container'>
      <div id='header-left'>
        <Link to='/'>
        <div id='title'>Bookworm</div>
        </Link>
        <div className='visible-on-small-screen'>
          <DropdownMenu isAuthed={props.isAuthed} apiKey={props.apiKey}/>
        </div>
        <div className='not-visible-on-small-screen'>
          {props.isAuthed && 
          <>
            <div id='header-tabs'>
              <Link to='/my-books'>
                <div className='header-tab'>My Books</div>
              </Link>
            </div>
          </>
          }
        </div>
      </div>
      <div className='not-visible-on-small-screen'>
        <div id='header-right'>
        {props.isAuthed && <Search id='search-bar' googleAPIKey={props.apiKey} />}
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
    </div>
  )
}

const DropdownMenu = props => {
  const [ showMenu, setShowMenu ] = useState(false);
  const wrapperRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = e => {
        if(ref.current && !ref.current.contains(e.target)) {
          setShowMenu(false);
        }
      }
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      } 
    }, [ref])
  }

  useOutsideAlerter(wrapperRef);

  return (
    
    <div ref={wrapperRef} className='menu-wrapper'>
      <div className='menu-pic'>
        <img onClick={toggleMenu} src="https://img.icons8.com/material-rounded/24/000000/menu--v3.png" alt='open menu' />
      </div>
      {showMenu && 
      <div className='menu-container'>
          <div className='menu-list'>
          {props.isAuthed && <Search toggleMenu={toggleMenu} className='list-item' id='search-bar' googleAPIKey={props.apiKey} />}
          {props.isAuthed && 
            <>
              <div id='header-tabs'>
                <Link to='/my-books'>
                  <div onClick={toggleMenu} className='header-tab list-item'>My Books</div>
                </Link>
              </div>
            </>
          }
          <div onClick={toggleMenu} className='btn'>
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
      }
    </div>
  )
}

export default Header;