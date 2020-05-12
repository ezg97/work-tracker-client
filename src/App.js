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
import AddInventory from './AddInventory/AddInventory'
import AddPurchase from './AddPurchase/AddPurchase'
import ErrorBoundary from './ErrorBoundary'
import config from './config'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      folders: [],
      notes: [],
      inventory: [],
      purchases: [],
    }
  }

  componentDidMount() {
    const folderUrl = config.API_ENDPOINT + '/api/folders';
    const purchaseUrl = config.API_ENDPOINT + '/api/notes/purchase'
    const inventoryUrl = config.API_ENDPOINT + '/api/notes/inventory';
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
      });

    fetch(inventoryUrl, {
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
         inventory: data
       })
     });

     fetch(purchaseUrl, {
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
         purchases: data
       })
     });
     setTimeout(() => {
      console.log('yk',[...this.state.inventory, ...this.state.purchases]);
        this.setState({
          notes: [...this.state.inventory, ...this.state.purchases]
        });
      }, 2000);
  }

  deleteNote = (noteId) => {
    const newNotes = this.state.notes.filter(note => note.id !== Number(noteId))
    this.setState({
      notes: newNotes
    })
    this.props.history.push('/')
  }

  createFolder = (folder) => {
    console.log('deleted: ',folder);
    const newFolders = [...this.state.folders, folder]
    this.setState({
      folders: newFolders
    })
    this.props.history.push('/');
  }

  createNote = (note) => {
    const newNotes = [...this.state.notes, note]
    this.setState({
      notes: newNotes
    });
    console.log(note.id, note.folderid);
    this.props.history.push(`/note/${note.id}`)
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: [...this.state.inventory, ...this.state.purchases],
      deleteNote: this.deleteNote,
      createFolder: this.createFolder,
      createNote: this.createNote,
    }
    return (
      <div className="App">
        <header>
          <Link to='/'>
            <h1 className="app_title">Oils Por Vida</h1>
          </Link>
        </header>
        <ApiContext.Provider value={contextValue}>
            <main>
              <ErrorBoundary>
              <Route exact path='/' component={Sidebar} />
              <Route exact path='/' component={Main} />
              <Route path='/folder/:folderId' component={Sidebar} />
              <Route path='/folder/:folderId' component={Main} />
              <Route path='/note/:noteId/:folderId' component={SidebarWithNoteSelected} />
              <Route path='/note/:noteId/:folderId' component={MainWithNoteSelected} />
              <Route path='/addfolder' component={AddFolder} />
              <Route path='/addinventory' component={AddInventory} />
              <Route path='/addpurchase' component={AddPurchase} />
              </ErrorBoundary>
            </main>
          </ApiContext.Provider>
      </div>
    )
  }
}

export default withRouter(App);
