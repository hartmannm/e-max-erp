const userStorageKey = 'e-max-user';

window.onload = () => {
  getUser();
}

const getUser = () => {
  if (!getData(userStorageKey)) {
    getRequest('/user/logged-user').then(user => {
      saveData(userStorageKey, user);
    });
  }
}
