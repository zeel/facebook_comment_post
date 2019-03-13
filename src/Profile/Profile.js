import React from 'react';
import {
    withRouter
  } from 'react-router-dom';

import {signUp} from '../api';

import './profile.css';

class Profile extends React.Component {
    constructor(props){
        super(props);
        // Ref for description input
        this.nameInput = React.createRef();
      }

    handleSubmit = () => {
        signUp({
            name: this.nameInput.current.value,
        });
        this.props.history.push('/feed');
    }

    render() {
        return (
            <div id="profile-info">
                <form id="profile-info-form" onSubmit={this.handleSubmit}>
                    <div className="input-row">
                        <label>Name</label><input type="text" id="profile-name" ref={this.nameInput}/>
                    </div>
                    <div className="input-row">
                        <input type='submit' />
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(Profile);
