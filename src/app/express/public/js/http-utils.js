const parseResponse = (response) => {
  if (response.ok) {
    if(response.headers.get('Content-Length') > 0) {
      return Promise.resolve(response.json());
    }
    return Promise.resolve();
  }
  return response.json().then(res => Promise.reject(res));
}

const postRequest = (url, body) => {
  const reqData = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  };
  if (body) {
    reqData.body = JSON.stringify(body);
  };
  return fetch(url, reqData).then(parseResponse);
}

const getRequest = (url) => {
  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(parseResponse);
}
