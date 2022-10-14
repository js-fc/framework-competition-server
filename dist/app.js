"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
// routes = require('./routes/index')
const host = '127.0.0.1';
const port = 7000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', routes)
app.listen(port, host, () => console.log(`Server listens http://${host}:${port}`));
//# sourceMappingURL=app.js.map