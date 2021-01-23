import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css'
// import Sidebar from './Sidebar/Sidebar';
// import SidebarWithNoteSelected from './SidebarWithNoteSelected/SidebarWithNoteSelected'
// import Main from './Main/Main';
// import MainWithNoteSelected from './MainWithNoteSelected/MainWithNoteSelected'
import ApiContext from './ApiContext';
import { withRouter } from 'react-router-dom'
// import AddFolder from './AddFolder/AddFolder'
// import AddInventory from './AddInventory/AddInventory'
// import AddPurchase from './AddPurchase/AddPurchase'
// import AddProfile from './AddProfile/AddProfile'
// import EditPurchase from './EditPurchase/EditPurchase'
// import EditInventory from './EditInventory/EditInventory'
// import ErrorBoundary from './ErrorBoundary'
import Authorization from './Authorization/Authorization'
import config from './config'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      folders: [],
      notes: [],
      inventory: [],
      purchases: [],
      profiles: [],
      loggedIn: false,
      userHasBeenChecked: false, //this will be used to see if "authorize()" has been executed yet
    }
    this.folderUrl = config.API_ENDPOINT + '/api/folders';
    this.purchaseUrl = config.API_ENDPOINT + '/api/notes/purchase';
    this.inventoryUrl = config.API_ENDPOINT + '/api/notes/inventory';
    this.profileUrl = config.API_ENDPOINT + '/api/notes/profiles';
    this.emailUrl = config.API_ENDPOINT + '/api/email/send';

  }

  logout = () => {
    console.log('logging out');

    fetch('http://localhost:8000/auth/logout',
    { method: "GET", 
      'credentials': 'include',
      headers: new Headers({
        'Accept': 'application/json',
        'Access-Control-Allow-Origin':'http://localhost:3000/',
        'Content-Type': 'application/json',
      })
    })
    .then(response => {
      console.log('response');
      if (!response.ok) {
          console.log('error:', response);
      }
      return response.json(); //the response is NOT Json
    })
    .then(response => {
      console.log('logged out',response);
      this.setState({
        loggedIn: false,
        user: {},
        userHasBeenChecked: true,
      });
    })
  }

  authorize = () => {
    console.log('authorizing...');
    
    fetch('http://localhost:8000/auth/',
    {   method: "GET", 
         'credentials': 'include',
          headers: new Headers({
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:3000/',
            'Content-Type': 'application/json',
         }),
    })
    .then(validAuth => {
      console.log('returned');
        if (!validAuth.ok) {
            console.log('error:', validAuth);
        }
        return validAuth.json(); //the response is NOT Json
    })
    .then (validAuth => {
        console.log('The authorization is: ',validAuth);
        if (Object.keys(validAuth).length > 0) {
            //  NOW fetch everything since the user has been authenticated
            this.fetchAll();
            this.setState({ 
              loggedIn: true,
              user: validAuth,
              userHasBeenChecked: true,
             });
            return true;
        }
        else {
            this.setState({
              loggedIn: false,
              user: {},
              userHasBeenChecked: true,
            });
            return false;
        }
    });
  }

  fetchAll = () => {
    this.fetchFolder();

    this.fetchInventory();
    this.fetchTransaction();
    this.fetchProfile();
     
    console.log('app notes', this.state.profiles)
     // COMBINING IT FOR HOME PAGE, remove once dashboard is in place
     setTimeout(() => {
      console.log('yk',[...this.state.inventory, ...this.state.purchases]);
        this.setState({
          notes: [...this.state.inventory, ...this.state.purchases]
        });
      }, 2000);
  }

  fetchFolder = () => {
    fetch(this.folderUrl, {
      method: 'GET',
      headers: {
        'content-type': 'application-json'
      }
    })
      .then(res => {
        console.log('fetched for folders.');
        if (!res.ok) {
          return res.json().then(error => {
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        console.log('the folder data returned: ', data);
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

  fetchProfile = () => {
    fetch(this.profileUrl, {
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
       console.log('fetched the profile', data);

       this.setState({
         profiles: data
       })
     });
  }

  componentDidMount() {
    this.authorize();
    // this.fetchFolder();

    // this.fetchInventory();
    // this.fetchTransaction();
    // this.fetchProfile();
     
    // console.log('app notes', this.state.profiles)
    //  // COMBINING IT FOR HOME PAGE, remove once dashboard is in place
    //  setTimeout(() => {
    //   console.log('yk',[...this.state.inventory, ...this.state.purchases]);
    //     this.setState({
    //       notes: [...this.state.inventory, ...this.state.purchases]
    //     });
    //   }, 2000);
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
    else if (folderId === 3) {
      console.log('fetching profs......');
      this.fetchProfile();
    }
    this.props.history.push('/')
  }

  updateNote = (folderId) => {
    // const newNotes = this.state.notes.filter(note => note.id !== Number(noteId))
    // this.setState({
    //   notes: newNotes
    // })
    console.log('updating folder... #'+folderId);
    if (folderId === 1) {
      this.fetchInventory();
    }
    else if (folderId === 2) {
      console.log('fetching trans......');
      this.fetchTransaction();
    }
    else if (folderId === 3) {
      console.log('fetching profs......');
      this.fetchProfile();
    }
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
    else if (Number(note.folderid) === 3) {
      this.fetchProfile();
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
    else if (folderId === 3) {
      console.log('fetching trans......');
      this.fetchProfile();
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
      profiles: [...this.state.profiles],
      userHasBeenChecked: this.state.userHasBeenChecked,
      loggedIn: this.state.loggedIn,
      deleteNote: this.deleteNote,
      updateNote: this.updateNote,
      createFolder: this.createFolder,
      createNote: this.createNote,
      editNote: this.editNote,
      logout: this.logout,
    }
    return (
      <div className="App">
        {console.table(this.state.notes)}
        
        <ApiContext.Provider value={contextValue}>
            <Route component = {Authorization}/>
            
          </ApiContext.Provider>
      </div>
      // <div className="App">
      //   {console.table(this.state.notes)}
      //   <header>
      //     <Link to='/'>
      //       <h1 className="app_title">Oils Por Vida</h1>
      //     </Link>
      //   </header>
      //   <ApiContext.Provider value={contextValue}>
      //       <main>
      //         <ErrorBoundary>
      //         <Route exact path='/' component={Sidebar} />
      //         <Route exact path='/' component={Main} />
      //         <Route path='/folder/:folderId' component={Sidebar} />
      //         <Route path='/folder/:folderId' component={Main} />
      //         <Route path='/note/:noteId/:folderId' component={SidebarWithNoteSelected} />
      //         <Route path='/note/:noteId/:folderId' component={MainWithNoteSelected} />
      //         <Route path='/addfolder' component={AddFolder} />
      //         <Route path='/addinventory' component={AddInventory} />
      //         <Route path='/addprofile' component={AddProfile} />
      //         <Route path='/addpurchase' component={AddPurchase} />
      //         <Route path='/editpurchase' component={EditPurchase} />
      //         <Route path='/editinventory' component={EditInventory} />
      //         </ErrorBoundary>
      //       </main>
      //     </ApiContext.Provider>
      // </div>
    )
  }
}

export default withRouter(App);
