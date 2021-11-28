import './App.css';
import{
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from "./Components/HomePage/Home"
import TenResource from "./Components/TenResourcePage/TenResource"
import SearchPage from "./Components/Search/SearchPage"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
            <Route path="resources" element={<TenResource/>}/>
            <Route path="search" element={<SearchPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
