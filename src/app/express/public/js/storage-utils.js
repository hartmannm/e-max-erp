const saveData = (key, value) => {
  if (typeof (value) !== 'string') {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
}

const getData = (key) => JSON.parse(window.localStorage.getItem(key));

const clearStorage = () => window.localStorage.clear();
