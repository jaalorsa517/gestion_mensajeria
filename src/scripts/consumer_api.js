import axios from "axios";

const instance = axios.create({
  baseURL: "http://jaalorsa517.pythonanywhere.com/api/v1",
  // baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

function get(url) {
  return instance.get(url);
}

function post(url, body, header = {}) {
  JSON.stringify(body);
  return instance.post(url, body);
}

export { get, post };
