import React, { Component } from 'react'
import './Main.css'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom'

class Main extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = ApiContext;

    render() {
        const { notes=[] } = this.context;
        const { folderId } = this.props.match.params;
        return (
            <div className="main__container">
                <div className="main__notelist">
                    {(!folderId ? notes : notes.filter(note => note.folderid === Number(folderId))).map(note => {
                        return (<Note key={note.id} note={note} />)
                    })}
                    <Link to='/addNote'><button className='addnote__button'>Add Note</button></Link>
                </div>
            </div>
        )
    }
}


export default Main;