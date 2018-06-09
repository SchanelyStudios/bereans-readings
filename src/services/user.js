import firebase from './firebase';

export default class UserService {

  static add(data) {
    console.log('adding user', data);
    return firebase.database().ref('users/' + data.uid).set({
        email: data.email,
        access_level: data.access_level
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

  static replace(oldUid, user) {
    return firebase.database().ref('users/' + oldUid)
      .remove()
      .then(() => this.addUser(user))
      .catch((error) => {
        console.error("Remove failed: " + error.message);
        return false;
      });
  }
}
