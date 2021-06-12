const saveData = (key, value) => {
  if (typeof (value) !== 'string') {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
}

const getData = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
}
