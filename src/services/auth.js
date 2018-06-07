import firebase from './firebase';

export default class AuthService {

  static isAuthenticated() {
    let userId = window.localStorage.getItem('BRR_USER_UID');
    let authed = window.localStorage.getItem('BRR_USER_AUTH');
    let access = window.localStorage.getItem('BRR_USER_ACCESS_LEVEL');
    console.log('auth info', userId, authed, access);
    if (userId !== 'null' && authed && access >= 0) {
      console.log('access granted');
      return true;
    }
    console.log('access denied');
    return false;
  }

  static addAuthenticated(user) {
    console.log('adding authed user', user);
    window.localStorage.getItem('BRR_USER_UID', user.uid);
    window.localStorage.getItem('BRR_USER_AUTH', true);
    window.localStorage.getItem('BRR_USER_ACCESS_LEVEL', 0);
  }

  static addUnauthed(user) {
    console.log('add unauthed/unverified user', user);
    window.localStorage.getItem('BRR_USER_UID', user.uid);
    window.localStorage.getItem('BRR_USER_AUTH', false);
    window.localStorage.getItem('BRR_USER_ACCESS_LEVEL', 0);
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
