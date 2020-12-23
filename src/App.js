import { Route, BrowserRouter as Router } from "react-router-dom";
import Admin from './containers/Admin/Admin';
import AdminLogin from './containers/Login/Login';
import './App.css';
import Leaderboard from "./components/Leaderboard/Leaderboard";


function App() {
    return(
        <div className="App">
            <Router>
                <Route path="/" exact component={ Admin } />
                <Route path="/login" component={ AdminLogin } />
                <Route path="/leaderboard" component={Leaderboard} />
            </Router>
        </div>
    );
}

export default App;