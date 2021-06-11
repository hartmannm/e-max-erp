window.onload = () => {
  const userHash = getUrlUserHash();
  if (userHash) {
    document.querySelector('#hash').value = userHash;
  }
}

const getUrlUserHash = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('hash');
}
