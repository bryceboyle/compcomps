import './App.css';
import{
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from "./Components/HomePage/Home"
import TenResource from "./Components/TenResourcePage/TenResource"
import SearchPage from "./Components/Search/SearchPage"
import PropertyPage from "./Components/PropertyPage/PropertyPage"
import SubmitReviewPage from "./Components/SubmitReviewPage/SubmitReviewPage"
import AccountPage from './Components/AccountPage/AccountPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/:userID" element={<Home/>}/>
            <Route path="resources" element={<TenResource/>}/>
            {/* <Route path="search" element={<SearchPage/>}>
              <Route path=":id" element={<PropertyPage/>}/>
            </Route> */}
            <Route path="search" element={<SearchPage/>}/>
            <Route path="search/:userID" element={<SearchPage/>}/>
            <Route path="property/:id" element={<PropertyPage/>}/>
            <Route path="review/:id" element={<SubmitReviewPage/>}/>
            <Route path="account/:id" element={<AccountPage/>}/>
            {/* <Route path="search/:id" render={({ match }) => <PropertyPage id={match.params.id} />}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
