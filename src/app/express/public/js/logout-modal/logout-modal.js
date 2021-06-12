const logout = () => {
  postRequest('/logout')
    .then(() => clearStorage())
    .then(() => window.location.replace('/login'));
}
