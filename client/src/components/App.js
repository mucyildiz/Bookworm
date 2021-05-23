import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Library from './Library';
import Recommendations from './Recommendations';

function App() {
  return (
    <div id='app-container'>
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/my-books" component={Library} />
          <Route exact path='/recommendations' component={Recommendations} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
