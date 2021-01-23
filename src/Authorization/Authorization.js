import React, {Component} from 'react';
import {Route, Switch, Link} from 'react-router-dom';
// import Auth from '../ContextAPI/LoginContext';
//import Auth from './Auth/Auth';

// import LandingPage from './LandingPage/LandingPage'
// import Login from './Login/Login'

import Sidebar from '../Sidebar/Sidebar';
import SidebarWithNoteSelected from '../SidebarWithNoteSelected/SidebarWithNoteSelected'
import Main from '../Main/Main';
import MainWithNoteSelected from '../MainWithNoteSelected/MainWithNoteSelected'
import ApiContext from '../ApiContext';
import { withRouter } from 'react-router-dom'
import AddFolder from '../AddFolder/AddFolder'
import AddInventory from '../AddInventory/AddInventory'
import AddPurchase from '../AddPurchase/AddPurchase'
import AddProfile from '../AddProfile/AddProfile'
import EditPurchase from '../EditPurchase/EditPurchase'
import EditInventory from '../EditInventory/EditInventory'
import EditProfile from '../EditProfile/EditProfile'
import ErrorBoundary from '../ErrorBoundary'

import UnknownPage from '../UnknownPage/UnknownPage';
import Login from '../Login/Login'

import "./Authorization.css"


// import '../App.css';

class Authorization extends Component {

  static contextType = ApiContext;

  constructor(props){
    super(props);
    this.state = {
        handle: '',
        content: ''
    };

}

  componentDidMount() {  
    // socket.on("FromAPI", data => {
    //   setResponse(data);
    // })
  
  }

  render() {
    //console.log('AUTHORIZATION JS');
    console.log('auth results\nHas Been Checked: ',this.context.userHasBeenChecked,'\nLogged In: ', this.context.loggedIn);
    //checks to see if the user has been validated. Aka, have we ran "authorized()" to even know if he's logged in or out
    if (this.context.userHasBeenChecked &&this.context.loggedIn) {
        return (
          <div className="OPV-page">
            <header>
              <Link to='/'>
                <h1 className="app_title">Oils Por Vida</h1>
              </Link>
            </header>
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
              <Route path='/addprofile' component={AddProfile} />
              <Route path='/addpurchase' component={AddPurchase} />
              <Route path='/editpurchase' component={EditPurchase} />
              <Route path='/editinventory' component={EditInventory} />
              <Route path='/editprofile' component={EditProfile} />

              </ErrorBoundary>
            </main>
          </div>
        );
    }
    else {
      //  //console.log('NOT loggged in');
        return (
          <div className='container'>

            <main className="App">
              <Switch>
                <Route exact path={['/']} component={Login} />
                <Route exact path={'/login'} component={Login} />
                <Route path='/' component={UnknownPage} />

              </Switch>
            </main>

          </div>
      );
    }
  
  }

}

    // return (
    //     <div className='container'>
    //         {//console.log('UNO :')}
    //         {//console.log(this.context.loggedIn)}
    //         {/* {this.context.isAuthValid = true} */}
    //         {/* {//console.log('OTRA VEZ:')}
    //         {//console.log(this.context.loggedIn)} */}
    //         {/* {//console.log('calling context function below:')}
    //         {//console.log(this.context.authorize())} */}
    //         {//console.log('LA ULTIMA:')}
    //         {//console.log(this.context.loggedIn)}

    //       <main className="App">
    //         <Switch>
    //           <Route exact path='/' component={LandingPage} />
    //           <Route exact path='/login' component={Login} />

    //           <Route exact path='/chat'  component={Chat} />
    //           <Route exact path='/home' component={Home} />
    //         </Switch>
    //       </main>

    //     </div>
    // );
 
  

export default Authorization;