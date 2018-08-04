import udaru from "./udaru";

export default {
  isAuthenticated() {
    return !!localStorage.getItem("auth");
  },
  logout() {
    localStorage.removeItem("auth");
  },
  async login(auth) {
    const user = await udaru.checkUserForLogin(auth);
    console.log(user);
    localStorage.setItem("auth", auth);
  },
  getUserId() {
    return localStorage.getItem("auth");
  }
};
