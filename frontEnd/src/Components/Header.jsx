import React from 'react';
import { getEmail } from '../Services/helper.js';


const Header = ({exit}) => {
    return (
        <div className="header">
            <div className="header__block">
                <p className="header__logo">Your feeds</p>
                <p className="header__email">{getEmail()}</p>
            </div>
            <i className="material-icons header__exit" onClick={exit}>exit_to_app</i>
        </div>
    )
}

export default Header;