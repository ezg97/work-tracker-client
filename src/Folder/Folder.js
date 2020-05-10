import React from 'react';
import { NavLink } from 'react-router-dom'; 
import './Folder.css';
import PropTypes from 'prop-types'

function Folder(props) {
    return (
        <NavLink to={`/folder/${props.id}`} className='folder__link' activeClassName='selected__folder'>
            <div className="folder">
                <p>{props.name}</p>
            </div>
        </NavLink>
    )
}

export default Folder;

Folder.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}

