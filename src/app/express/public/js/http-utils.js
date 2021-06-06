function parseResponse(response) {
  if (response.ok) {
    return Promise.resolve(response.json());
  }
  return response.json().then(res => Promise.reject(res));
}

function postRequest(url, body) {
  return fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(parseResponse);
}
