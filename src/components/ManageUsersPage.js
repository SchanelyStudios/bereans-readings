import React, { Component } from 'react';
import AuthService from '../services/auth';
import UserService from '../services/user';

import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from "bs4-modal-react";

class ManagerUsersPage extends Component {

  accessLevels = [{
      label: 'Authorized user',
      value: 1
    }, {
      label: 'Administrator',
      value: 2
    }, {
      label: 'Super Administrator',
      value: 3
  }];

  currentUser = AuthService.getLocalUserData();

  state = {
    users: [],
    showModal: false,
    loading: true
  };

  constructor() {
    super();
    this.doNotUpdate = false;
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  shouldComponentUpdate() {
    if (this.doNotUpdate) {
      this.doNotUpdate = false;
      return false;
    }
    return true;
  }

  async getUsers() {
    let users = await UserService.getAll();
    this.setState({
      loading: false,
      users
    });
  }

  deleteUser(e, uid) {
    e.preventDefault();

    // On this page we want to physically remove a deleted user
    let users = this.state.users;

    let i = 0;
    // So we search for the matching user as the one whose uid is passed up to here
    for (let user of users) {
      if (user.uid === uid) {
        // We delete it from Firebase and from this list
        UserService.remove(uid);
        users.splice(i, 1);
        break;
      }
      i = i + 1;
    }

    // Modified list gets passed back to state
    this.setState({
      users
    })
  }

  handleChange = (e) => {
    // e.preventDefault();
    let activeUser = this.state.activeUser;
    activeUser[e.target.name] = e.target.value;
    this.doNotUpdate = true;
    this.setState({ activeUser }, () => {
      console.log('updated');
    });
  }

  onHide = () => this.setState({ showModal: false });

  onShow = () => this.setState({ showModal: true });

  onSave = () => {
    this.saveUser();
    this.onHide();
  };

  async saveUser() {
    console.log('saving user', this.state.activeUser);
    await UserService.save(this.state.activeUser);
    this.setState({
      users: [],
      loading: true
    }, () => this.getUsers());
  }

  toggleEditUserModal(e, user) {
    e.preventDefault();
    if (!user) {
      user =  {
        email: '',
        access_level: 1,
        uuid: 0
      }
      console.log('adding user', user);
    } else {
      console.log('editing user', user);
    }
    this.setState({
      activeUser: Object.assign({}, user),
      showModal: true
    });
  }

  userModal() {
    let user = this.state.activeUser;
    return (
      <Modal visible={this.state.showModal} onHide={this.onHide}>
        <ModalHeader>
          <ModalTitle>Edit User</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {user ? (
            <ul>
              <li>
                <label>Email</label>
                <input type="email" name="email" defaultValue={user.email} onInput={this.handleChange} />
              </li>
              <li>
                <label>Access level</label>
                <select name="access_level" defaultValue={user.access_level} onChange={this.handleChange}>
                  {this.accessLevels.map(al => {
                    if (al.value > this.currentUser.access_level) {
                      return false;
                    }
                    return (
                      <option key={al.value} value={al.value}>{al.label}</option>
                    );
                  })}
                </select>
              </li>
            </ul>
          ) : (
            <p>No user selected</p>
          )}
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-secondary" onClick={this.onHide}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={this.onSave}>
            Save changes
          </button>
        </ModalFooter>
      </Modal>
    );
  }

  render() {
    return (
      <div className="ManagerUsersPage">
        <button className="btn btn-success float-right" onClick={(e) => this.toggleEditUserModal(e)}>Add User</button>
        <h2 className="mt-3">Users </h2>
        {this.state.loading ? (
          <p>Loading users...</p>
        ) : this.state.users ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Email</th>
                <th>Access Level</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
            {this.state.users.map(user => {
              let accessLevel = '';
              for (let al of this.accessLevels) {
                if (al.value === user.access_level) {
                  accessLevel = al.label;
                  break;
                }
              }
              return (
                <tr key={user.uid}>
                  <td>{user.email}</td>
                  <td>{accessLevel}</td>
                  <td>
                    <button className="btn btn-danger" onClick={(e) => this.deleteUser(e, user.uid)}>Remove</button>
                    <button className="btn btn-warning" onClick={(e) => this.toggleEditUserModal(e, user)}>Edit</button>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        ): (
          <p>No users found</p>
        )}
        {this.userModal()}
      </div>
    );
  }

}
export default ManagerUsersPage;
