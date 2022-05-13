const fetch = require('node-fetch');
const response = fetch('http://192.168.240.21:5000/metric');
const data = response.json();
console.log(data);

