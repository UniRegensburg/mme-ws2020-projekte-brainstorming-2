/* eslint-disable one-var */
/* eslint-env node */
const client = require('socket.io-client');

const socket = client.io("http://localhost:8000");

socket.emit("message", {data: "hallo"});