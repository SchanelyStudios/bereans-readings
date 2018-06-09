import UserService from './user';

export default class AuthService {

  static isAuthenticated() {
    let user = this.getLocalUserData();
    if (user.uid !== 'null' && user.auth && user.access_level >= 0) {
      return true;
    }
    return false;
  }

  static checkAuth(user) {

    // We can first check the local storage for a user and return its info
    // to save some processing time
    if (this.isAuthenticated()) {
      return this.getLocalUserData();
    }

    // Must not have a user in local storage yet...

    // But if no valid user is provided we can quit right here
    if (!user || !user.uid) {
      return false;
    }

    // Otherwise we need to load a user to analyze
    // NOTE: Incoming user here is from the Firebase auth service, so it will
    // have a uid and email if its valid but not an acceess_level
    return UserService.get(null, user.email).then(res => {
      let authorized = false;
      if (res && res.uid !== user.uid) {
        authorized = UserService.replace(res.uid, {
          uid: user.uid,
          email: res.email,
          access_level: res.access_level
        }).then(user => this.setLocalUserData(
          user.uid,
          user.email,
          user.access_level
        ));
      } else if (res) {
        authorized = this.setLocalUserData(
          res.uid,
          res.email,
          res.access_level
        );
      } else {
        UserService.add({ uid: user.uid, email: user.email, access_level: 0 });
        this.setLocalUserData(user.uid, user.email);
      }
      return authorized;
    });
  }

  static getLocalUserData() {
    let user = {
      uid: window.localStorage.getItem('BRR_USER_UID'),
      auth: !!window.localStorage.getItem('BRR_USER_AUTH'),
      email: window.localStorage.getItem('BRR_USER_EMAIL'),
      access_level: Number(window.localStorage.getItem('BRR_USER_ACCESS_LEVEL'))
    }
    return user;
  }

  static setLocalUserData(uid, email, access_level) {
    access_level = !access_level ? 0 : access_level;
    const auth = uid && email && access_level > 0 ? true : false;
    window.localStorage.setItem('BRR_USER_UID', uid);
    window.localStorage.setItem('BRR_USER_EMAIL', email);
    window.localStorage.setItem('BRR_USER_ACCESS_LEVEL', access_level);
    window.localStorage.setItem('BRR_USER_AUTH', auth);

    return {
      uid, email, access_level, auth
    };
  }

}
