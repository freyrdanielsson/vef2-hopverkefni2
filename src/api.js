const baseurl = process.env.REACT_APP_SERVICE_URL;

async function get(endpoint) {
// Skítamix með trim því " " fylgdi með
  const token = window.localStorage.getItem('token');

  const url = `${baseurl}${endpoint}`;

  const options = {
    headers: {},
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  console.log(options);
    

  const response = await fetch(url, options);

  const result = await response.json();

  return { result, status: response.status};
}

export async function post(endpoint, data) {
  const url = `${baseurl}${endpoint}`;

  const options = {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  };

  const response = await fetch(url, options);

  const result = await response.json();
  
  

  return { result, status: response.status };
}

/* todo aðrar aðgerðir */

export default {
  get,
  post
};
