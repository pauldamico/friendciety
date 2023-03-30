const express = require("express");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const Files = require("../models/files.js");
const filesRouter = express.Router();


module.exports = filesRouter