const express = require("express");

const app = express();

app.use(express.json());

const sql = require("../Database/index");
