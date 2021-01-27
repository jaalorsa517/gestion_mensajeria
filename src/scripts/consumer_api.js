import axios from "axios";

const instance = axios.create({
  baseURL: "http://jaalorsa517.pythonanywhere.com/api/v1",
  // baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

function get(url, auth = null) {
  return !auth ? instance.get(url) : instance.get(url, { auth });
}

function post(url, body) {
  return instance.post(url, JSON.stringify(body));
}

function patch(url, body, auth) {
  JSON.stringify(body);
  return instance.patch(url, JSON.stringify(body), { auth });
}

export { get, post, patch };
