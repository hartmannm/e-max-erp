window.onload = () => {
  document.querySelector('#hash').value = getUrlUserHash();
}

const getUrlUserHash = () => {
  return window.location.href.split('/').pop();
}
