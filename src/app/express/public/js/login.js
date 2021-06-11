window.onload = () => {
  const userEmail = getUrlEmail();
  if (userEmail) {
    document.querySelector('#email').value = userEmail;
  }
}

const getUrlEmail = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('email');
}
