import './Header.css';

function Header() {
  return (
    <div id='header-container'>
      <div id='header-left'>
        <div id='title'>
          Bibliophili
        </div>
        <div id='header-tabs'>
          <div className='header-tab'>Home</div>
          <div className='header-tab'>My Books</div>
          <div className='header-tab'>Get Recommendations</div>
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