import firebase from './firebase';

export default class AuthService {

  static isAuthenticated() {
    let userId = window.localStorage.getItem('BRR_USER_UID');
    let authed = window.localStorage.getItem('BRR_USER_AUTH');
    let access = window.localStorage.getItem('BRR_USER_ACCESS_LEVEL');
    if (userId !== 'null' && authed && access >= 0) {
      return true;
    }
    return false;
  }

  static addAuthenticated(user) {
    window.localStorage.getItem('BRR_USER_UID', user.uid);
    window.localStorage.getItem('BRR_USER_AUTH', true);
    window.localStorage.getItem('BRR_USER_ACCESS_LEVEL', user.access_level);
    return user.access_level > 0 ? true : false;
  }

  static addUnauthed(user) {
    window.localStorage.getItem('BRR_USER_UID', user.uid);
    window.localStorage.getItem('BRR_USER_AUTH', false);
    window.localStorage.getItem('BRR_USER_ACCESS_LEVEL', 0);
    this.addUser({ uid: user.uid, email: user.email, access_level: 0 });
  }

  static addUser(data) {
    return firebase.database().ref('users/' + data.uid).set({
      email: data.email,
      access_level: data.access_level
    }).then(() => {
      return data;
    }).catch((error) => {
      console.error('Failed to save user', error);
    });
  }

  static checkAuth(user) {
    if (this.isAuthenticated()) {
      return true;
    }

    if (!user || !user.uid) {
      return false;
    }

    return this.getUser(null, user.email).then(res => {
      let authorized = false;
      if (res) {
        if (res.uid !== user.uid) {
          authorized = this.replaceUser(res.uid, {
            uid: user.uid,
            email: res.email,
            access_level: res.access_level
          }).then(user => this.addAuthenticated(user));
        } else {
          authorized = this.addAuthenticated(res);
        }
      } else {
        this.addUnauthed(user);
      }
      return authorized;
    });
  }

  static getUser(uid, email) {
    if (!uid && email) {
      return firebase.database().ref('users')
        .orderByChild('email').equalTo(email).once('value').then(snap => {
          let user = {
            uid,
            email,
            access_level: 0
          };
          let val = snap.val();
          for (let key in val) {
            user.uid = key;
            user.email = val[key].email;
            user.access_level = val[key].access_level;
          }
          console.log('user found', user);
          return user;
        });
    }
    return firebase.database()
      .ref('users/' + uid)
      .once('value')
      .then(snap => snap.val());
  }

  static replaceUser(oldUid, user) {
    return firebase.database().ref('users/' + oldUid).remove()
      .then(() => {
        return this.addUser(user);
      })
      .catch((error) => {
        console.error("Remove failed: " + error.message);
        return false;
      });
  }

}
