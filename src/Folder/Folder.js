import React from 'react';
import { NavLink } from 'react-router-dom'; 
import './Folder.css';
import PropTypes from 'prop-types'

function Folder(props) {
    return (
        <>
            <div className='folder_container'>
                <span className="line"></span>
                <NavLink to={`/folder/${props.id}`} className='folder__link' activeClassName='selected__folder'>
                    <div className="folder">
                        <p>{props.name}</p>
                    </div>
                </NavLink>
                <span className="line"></span>
            </div>
        </>
    )
}

export default Folder;

Folder.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}

