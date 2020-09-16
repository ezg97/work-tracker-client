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
import EditPurchase from './EditPurchase/EditPurchase'
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
    this.folderUrl = config.API_ENDPOINT + '/api/folders';
    this.purchaseUrl = config.API_ENDPOINT + '/api/notes/purchase';
    this.inventoryUrl = config.API_ENDPOINT + '/api/notes/inventory';
  }

  fetchFolder = () => {
    fetch(this.folderUrl, {
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
  }

  fetchInventory = () => {
    fetch(this.inventoryUrl, {
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
  }

  fetchTransaction = () => {
    fetch(this.purchaseUrl, {
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
  }

  componentDidMount() {
    this.fetchFolder();

    this.fetchInventory();
    this.fetchTransaction();
     

     // COMBINING IT FOR HOME PAGE, remove once dashboard is in place
     setTimeout(() => {
      console.log('yk',[...this.state.inventory, ...this.state.purchases]);
        this.setState({
          notes: [...this.state.inventory, ...this.state.purchases]
        });
      }, 2000);
  }

  deleteNote = (folderId) => {
    // const newNotes = this.state.notes.filter(note => note.id !== Number(noteId))
    // this.setState({
    //   notes: newNotes
    // })
    if (folderId === 1) {
      this.fetchInventory();
    }
    else if (folderId === 2) {
      console.log('fetching trans......');
      this.fetchTransaction();
    }
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

    if (Number(note.folderid) === 1) {
      this.fetchInventory();
    }
    else if (Number(note.folderid) === 2) {
      this.fetchTransaction();
    }
    this.props.history.push(`/`)
  }

  editNote = (folderId) => {
    console.log('edited note: ',folderId);
    if (folderId === 1) {
      this.fetchInventory();
    }
    else if (folderId === 2) {
      console.log('fetching trans......');
      this.fetchTransaction();
    }
    // const newNotes = [...this.state.notes, note]
    // this.setState({
    //   notes: newNotes
    // });
    // console.log(note.id, note.folderid);
    this.props.history.push(`/`)
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: [...this.state.notes],
      inventory: [...this.state.inventory],
      transactions: [...this.state.purchases],
      deleteNote: this.deleteNote,
      createFolder: this.createFolder,
      createNote: this.createNote,
      editNote: this.editNote,
    }
    return (
      
      <div className="App">
        {console.table(this.state.notes)}
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
              <Route path='/editpurchase' component={EditPurchase} />
              <Route path='/editinventory' component={AddInventory} />
              </ErrorBoundary>
            </main>
          </ApiContext.Provider>
      </div>
    )
  }
}

export default withRouter(App);
