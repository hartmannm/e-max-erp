const parseResponse = (response) => {
  if (response.ok) {
    return Promise.resolve(response.json());
  }
  return response.json().then(res => Promise.reject(res));
}

const postRequest = (url, body) => {
  return fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(parseResponse);
}

const getRequest = (url) => {
  return fetch(url, {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  }).then(parseResponse);
}
