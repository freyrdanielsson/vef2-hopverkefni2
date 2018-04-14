const baseurl = process.env.REACT_APP_SERVICE_URL;

async function get(endpoint) {

  const token = window.localStorage.getItem('token');

  const url = `${baseurl}${endpoint}`;

  const options = {
    headers: {},
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, options);

  const result = await response.json();

  return { result, status: response.status};
}

export async function post(endpoint, data) {
  const url = `${baseurl}${endpoint}`;

  const token = window.localStorage.getItem('token');

  const options = {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, options);

  const result = await response.json();

  return { result, status: response.status };
}

export async function postFile(endpoint, data) {
  
  const url = `${baseurl}${endpoint}`;

  const token = window.localStorage.getItem('token');

  const options = {
    body: data,
    headers: {

    },
    method: 'POST',
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, options);

  const result = await response.json();

  return { result, status: response.status };
}


export async function patch(endpoint, data) {
  const url = `${baseurl}${endpoint}`;
  const token = window.localStorage.getItem('token');

  const options = {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    method: 'PATCH',
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, options);
  const result = await response.json();

  return { result, status: response.status };
}

/* todo aðrar aðgerðir */

export default {
  get,
  post,
  postFile,
  patch
};
