import { Route, BrowserRouter as Router } from "react-router-dom";
import Admin from './containers/Admin/Admin';
import AdminLogin from './containers/Login/Login';

import './App.css';

function App() {
    return(
        <div className="App">
            <Router>
                <Route path="/" exact component={ Admin } />
                <Route path="/login" component={ AdminLogin } />
            </Router>
        </div>
    );
}

export default App;