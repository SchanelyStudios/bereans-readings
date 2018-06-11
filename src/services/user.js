import firebase from './firebase';

import uuid from 'uuid/v4';

export default class UserService {

  static add(data) {
    return firebase.database().ref('users/' + data.uid).set({
        email: data.email,
        access_level: Number(data.access_level)
      })
      .then(() => data)
      .catch((error) => {
        console.error('Failed to save user', error);
      });
  }

  static get(uid, email) {
    if (!uid && email) {
      return firebase.database().ref('users')
        .orderByChild('email')
        .equalTo(email)
        .once('value')
        .then(snap => {
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
          return user;
        });
    }
    return firebase.database()
      .ref('users/' + uid)
      .once('value')
      .then(snap => snap.val());
  }

  static getAll() {
    return firebase.database().ref('users/')
      .orderByChild('email')
      .once('value')
      .then(snap => {
        let users = [];
        snap.forEach((dbUser) => {
          users.push(Object.assign({ uid: dbUser.key }, dbUser.val()));
        });
        return users;
      });
  }

  static replace(oldUid, user) {
    return firebase.database().ref('users/' + oldUid)
      .remove()
      .then(() => this.add(user))
      .catch((error) => {
        console.error("Remove failed: " + error.message);
        return false;
      });
  }

  static remove(uid) {
    return firebase.database().ref('users/' + uid)
      .remove()
      .then(() => true)
      .catch((error) => {
        console.error("Remove failed: " + error.message);
        return false;
      });
  }

  static save(user) {
    if (!user.uid) {
      console.info('Adding new user', user);
      user.uid = uuid();
      return this.add(user);
    } else {
      console.info('saving existing user', user);
      return this.add(user);
    }
  }
}
