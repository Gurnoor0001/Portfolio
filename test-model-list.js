const fetch = require('node-fetch');
async function list() {
  try {
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyD1UhaZi0jvcBoFRj3qOIKQPy1lz6kv9m0');
    const json = await res.json();
    console.log(json.models.map(m => m.name));
  } catch (e) {
    console.log(e);
  }
}
list();
