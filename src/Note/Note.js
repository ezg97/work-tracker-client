import React from 'react';
import { Link } from 'react-router-dom';
import './Note.css';
import ApiContext from '../ApiContext'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import config from '../config'

function deleteNoteRequest(event, note, callback) {
    event.preventDefault();
    const noteId = note.id;
    console.log(noteId);
    const url = config.API_ENDPOINT + `/api/notes/${noteId}`
    fetch(url, {
        method: 'DELETE',
        headers: {
            'content-type': 'application-json',
            'folderid': `${note.folderid}`
        }
    })
        .then(res => {
            if (!res) {
                res.json().then(error => {
                    throw error
                })
            }
            // return res.json()
        })
        .then(() => {
            callback(noteId)
        })
        .catch(error => console.log(error))
}

function Note(props) {
    var moment = require('moment');
    const formatTime = moment(props.note.modified).format('MMMM Do YYYY h:mm a');
    if (props.note.folderid === 1) {
        return (
            <ApiContext.Consumer>
                {(context) => {
                    return (
                    <div className="note">
                        <Link to={`/note/${props.note.id}/${props.note.folderid}`} className='note__link'>
                            <h3>{props.note.name}</h3> 
                        </Link>
                        <button onClick={(event) => deleteNoteRequest(event, props.note, context.deleteNote)}>Delete</button>
                    </div>
                    )
                }}
            </ApiContext.Consumer>
        )
    }
    else if (props.note.folderid === 2) {
        return(
        <ApiContext.Consumer>
                {(context) => {
                    return (
                    <div className="note">
                        <Link to={`/note/${props.note.id}/${props.note.folderid}`} className='note__link'>
                            <h3>{props.note.name}</h3> 
                        </Link>
                        <p>{props.note.paymentStatus}</p>
                        <p>{props.note.total}</p>
                        <p>{formatTime}</p>
                        <button onClick={(event) => deleteNoteRequest(event, props.note.id, context.deleteNote)}>Delete</button>
                    </div>
                    )
                }}
            </ApiContext.Consumer>
        )
    }
    else{
        return (
            <ApiContext.Consumer>
                {(context) => {
                    return (
                    <div className="note">
                        <Link to={`/note/${props.note.id}/${props.note.folderid}`} className='note__link'>
                            <h3>{props.note.name}</h3> 
                        </Link>
                        <p>{formatTime}</p>
                        <button onClick={(event) => deleteNoteRequest(event, props.note.id, context.deleteNote)}>Delete</button>
                    </div>
                    )
                }}
            </ApiContext.Consumer>
        )
    }
   
}

export default withRouter(Note);

Note.propTypes = {
    note: PropTypes.object,
}