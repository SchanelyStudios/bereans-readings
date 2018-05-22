import firebase from './firebase';

export default class AuthService {

  static isAuthenticated() {
    let userId = window.localStorage.getItem('BRR_USER_UID');
    let authed = window.localStorage.getItem('BRR_USER_AUTH');
    console.log('auth info', userId, authed);
    if (userId !== 'null' && authed) {
      return true;
    }
    return false;
  }

  static addAuthenticated(user) {
    console.log('adding authed user', user);
    window.localStorage.getItem('BRR_USER_UID', user.uid);
    window.localStorage.getItem('BRR_USER_AUTH', true);
  }

  static addUnauthed(user) {
    console.log('add unauthed/unverified user', user);
    window.localStorage.getItem('BRR_USER_UID', user.uid);
    window.localStorage.getItem('BRR_USER_AUTH', false);
  }

  static checkAuth(user) {
    if (this.isAuthenticated()) {
      return true;
    }

    if (!user || !user.uid) {
      console.log('no valid user', user);
      return false;
    }

    return this.getUser(user.uid).then(res => {
      console.log('checkauth result', res);
      if (res) {
        this.addAuthenticated(user);
      } else {
        this.addUnauthed(user);
      }
      return res ? true : false;
    });
  }

  static getUser(uid) {
    // let root = this;
    return firebase.database()
      .ref('users/' + uid)
      .once('value')
      .then(snap => {
        console.log('getting user', snap.val());
        return snap.val();
      });
  }

}
