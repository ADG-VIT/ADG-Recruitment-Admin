import React from 'react';
import { useHistory } from 'react-router-dom';
import LogoutModule from './Logout.module.css';

const Logout = () => {
    const history = useHistory();

    const handleSubmit = function() {
        sessionStorage.clear();
        history.push("/login");
    }

    return(
        <div className={ LogoutModule.logout }>
            <button className={ LogoutModule.logoutBtn } onClick={ handleSubmit }>Logout</button>
        </div>
    )
}

export default Logout;