import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import { NavLink } from 'react-router-dom';


import './UnknownPage.css';

class UnkownPage extends Component {

  constructor(props){
    super(props);
        this.state = {
            handle: '',
            content: ''
        };
    }

  componentDidMount() {

  }

  render() {    
      return (
        <div className='container unknown'>
            {/* {//console.log('PASSED UNO :')} */}
       
            <div className="unknown-background"></div>
            <div className="unknown-text">
              <h2> You're lost... </h2>
                <button><NavLink to="/">Return Home</NavLink></button>
            </div>
              
           
                       

        </div>
      );
    }
}

export default UnkownPage;