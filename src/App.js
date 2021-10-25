import './App.css';
import{
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./Components/HomePage/Home"
import TenResource from "./Components/TenResourcePage/TenResource"
import SearchPage from "./Components/Search/SearchPage"

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Router>
        <Switch>
          <Route exact path="/"> <Home/> </Route>
          <Route exact path="/resources"> <TenResource/> </Route>
          <Route exact path="/search"> <SearchPage/> </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
