import React from 'react';
import { withRouter } from 'react-router-dom';
import './SidebarWithNoteSelected.css';
import Folder from '../Folder/Folder'
import ApiContext from '../ApiContext'

class SidebarWithNoteSelected extends React.Component {
    static defaultProps = {
        match: {
            params: {
                noteId: ""
            }
        }
    }
    static contextType = ApiContext
    render() {
        const noteId = this.props.match.params.noteId;
        const note = this.context.notes.find(note => Number(note.id) === Number(noteId)) || {};
        const selectedFolder = this.context.folders.find(folder => folder.id === note.folderid) || {};
        return (
            <div className='sidebar'>
                <button onClick={() => this.props.history.goBack()}>Go back</button>
                <Folder key={selectedFolder.id} id={selectedFolder.id} name={selectedFolder.foldername} />
            </div>
        )

    }
}

export default withRouter(SidebarWithNoteSelected);