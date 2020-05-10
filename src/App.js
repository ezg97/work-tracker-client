import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css'
import Sidebar from './Sidebar/Sidebar';
import SidebarWithNoteSelected from './SidebarWithNoteSelected/SidebarWithNoteSelected'
import Main from './Main/Main';
import MainWithNoteSelected from './MainWithNoteSelected/MainWithNoteSelected'
import ApiContext from './ApiContext';
import { withRouter } from 'react-router-dom'
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'
import ErrorBoundary from './ErrorBoundary'
import config from './config'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      folders: [],
      notes: [],
    }
  }

  componentDidMount() {
    const folderUrl = config.API_ENDPOINT + '/api/folders'
    const noteUrl = config.API_ENDPOINT + '/api/notes'
    fetch(folderUrl, {
      method: 'GET',
      headers: {
        'content-type': 'application-json'
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        this.setState({
          folders: data
        })
      })

    fetch(noteUrl, {
      method: 'GET',
      headers: {
        'content-type': 'application-json'
      }
    })
     .then(res => {
       if(!res.ok) {
         return res.json().then(error => {
           throw error
         })
       }
       return res.json()
     })
     .then(data => {
       this.setState({
         notes: data
       })
     })
  }

  deleteNote = (noteId) => {
    const newNotes = this.state.notes.filter(note => note.id !== Number(noteId))
    this.setState({
      notes: newNotes
    })
    this.props.history.push('/')
  }

  createFolder = (folder) => {
    const newFolders = [...this.state.folders, folder]
    this.setState({
      folders: newFolders
    })
    this.props.history.push('/')
  }

  createNote = (note) => {
    const newNotes = [...this.state.notes, note]
    this.setState({
      notes: newNotes
    })
    this.props.history.push('/')
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      createFolder: this.createFolder,
      createNote: this.createNote,
    }
    return (
      <div className="App">
        <header>
          <Link to='/'>
            <h1 className="app_title">Noteful</h1>
          </Link>
        </header>
        <ApiContext.Provider value={contextValue}>
            <main>
              <ErrorBoundary>
              <Route exact path='/' component={Sidebar} />
              <Route exact path='/' component={Main} />
              <Route path='/folder/:folderId' component={Sidebar} />
              <Route path='/folder/:folderId' component={Main} />
              <Route path='/note/:noteId' component={SidebarWithNoteSelected} />
              <Route path='/note/:noteId' component={MainWithNoteSelected} />
              <Route path='/addfolder' component={AddFolder} />
              <Route path='/addnote' component={AddNote} />
              </ErrorBoundary>
            </main>
          </ApiContext.Provider>
      </div>
    )
  }
}

export default withRouter(App);
