import React from 'react';
import { withRouter } from 'react-router-dom';
import './SidebarWithNoteSelected.css';
import Folder from '../Folder/Folder'
import ApiContext from '../ApiContext'

class SidebarWithNoteSelected extends React.Component {
    static defaultProps = {
        match: {
            params: {
                noteId: "",
                folderId: "",
            }
        }
    }
    
    static contextType = ApiContext;
    render() {
        const selectedFolder = this.context.folders.find((folder) => {
            if (parseInt(folder.id) === parseInt(this.props.match.params.folderId)) {
                return folder;
            }
        }) || {};
        if (parseInt(this.props.match.params.folderId) === 1) {
            return (
                <div className='sidebar'>
                    <button onClick={() => this.props.history.goBack()}>Go back</button>
                    <Folder key={selectedFolder.id} id={selectedFolder.id} name={selectedFolder.foldername} />
                </div>
            )
        }
        else if(parseInt(this.props.match.params.folderId) === 2) {
            return (
                <div className='sidebar'>
                    <button onClick={() => this.props.history.goBack()}>Go back</button>
                    <Folder key={selectedFolder.id} id={selectedFolder.id} name={selectedFolder.foldername} />
                </div>
            )
        }
        else if(parseInt(this.props.match.params.folderId) === 3) {
            return (
                <div className='sidebar'>
                    <button onClick={() => this.props.history.goBack()}>Go back</button>
                    <Folder key={selectedFolder.id} id={selectedFolder.id} name={selectedFolder.foldername} />
                </div>
            )
        }
        else{
            return(<div></div>)
        }
        

    }
}

export default withRouter(SidebarWithNoteSelected);