import { Route, BrowserRouter as Router } from "react-router-dom";
import Admin from './containers/Admin/Admin';
import AdminLogin from './containers/Login/Login';

import './App.css';
import Details from "./components/AdminQuestions/Details/Details";
import UserInfo from "./components/AdminQuestions/Details/UserInfo";
import Leaderboard from "./components/Leaderboard/Leaderboard";

function App() {
    return(
        <div className="App">
            <Router>
                <Route path="/" exact component={ Admin } />
                <Route path="/login" component={ AdminLogin } />
                <Route path="/details" component={Details} />
                <Route path="/user-info" component={UserInfo} />
                <Route path="/leaderboard" component={Leaderboard} />
            </Router>
        </div>
    );
}

export default App;