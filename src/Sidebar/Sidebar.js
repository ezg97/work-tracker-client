import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Sidebar.css';
import Folder from '../Folder/Folder'
import ApiContext from '../ApiContext'

class Sidebar extends Component {
    static contextType = ApiContext;
    static defaultProps = {
        match: {
            params: {}
        }
    }
    render() {
        return (
            <div className='sidebar'>
                {this.context.folders.map(folder => {
                    return (<Folder key={folder.id} id={folder.id} name={folder.foldername} />)
                })}
            <Link to='/addfolder'><button> Add Folder </button></Link>
            </div>
        )
    }

}

export default withRouter(Sidebar);